import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Event } from '@/modules/event/entities/event.entity';
import { Privacy } from '@/modules/event/enum/privacy.enum';
import { Invitation, InvitationDocument } from './entities/invitation.entity';
import { InvitationResponseStatus } from './enums/invitation-response.enum';
import { SendInvitationInput } from './dto/send-invitation.input';
import { Companion, CompanionDocument } from '@/modules/companion/entities/companion.entity';
import { PrivacySettingService } from '@/modules/privacy-setting/privacy-setting.service';
import { PrivacyVisibility } from '@/modules/privacy-setting/enums/privacy-visibility.enum';

@Injectable()
export class InvitationService {
    constructor(
        @InjectModel(Invitation.name) private invitationModel: Model<InvitationDocument>,
        @InjectModel(Event.name) private eventModel: Model<Event>,
        @InjectModel(Companion.name) private companionModel: Model<CompanionDocument>,
        private readonly privacySettingService: PrivacySettingService,
    ) {}

    async getInvitation(userId: Types.ObjectId): Promise<InvitationDocument[]> {
        return this.invitationModel
            .find({ receiver: userId })
            .populate([
                { path: 'sender', select: '_id firstName' },
                {
                    path: 'event',
                    select: '_id name location image time startDate organizer',
                    populate: { path: 'organizer', select: '_id firstName' },
                },
            ])
            .exec();
    }

    async getCompanionInvitationEvent(
        organizerId: Types.ObjectId,
        companionId?: Types.ObjectId,
    ): Promise<Event[]> {
        const currentDate = new Date();

        const ownEvents = await this.eventModel
            .find({
                organizer: organizerId,
                startDate: { $gte: currentDate },
            })
            .sort({ startDate: 1 })
            .exec();

        const acceptedInvitations = await this.invitationModel
            .find({
                receiver: organizerId,
                status: InvitationResponseStatus.ACCEPTED,
            })
            .populate<{ event: Event }>('event')
            .exec();

        const acceptedEvents = acceptedInvitations
            .map((inv) => inv.event)
            .filter((event): event is Event => event != null);

        const candidateEvents = [...ownEvents, ...acceptedEvents];

        if (companionId) {
            const candidateEventIds = candidateEvents.map((e) => e._id);
            const existingInvitations = await this.invitationModel.find({
                event: { $in: candidateEventIds },
                sender: organizerId,
                receiver: companionId,
            });

            if (existingInvitations.length > 0) {
                const excludedEventIds = new Set(
                    existingInvitations.map((inv) => inv.event.toString()),
                );

                return candidateEvents.filter(
                    (e) => !excludedEventIds.has(e._id.toString()),
                );
            }
        }

        return candidateEvents;
    }

    async getDeclinedEvents(userId: Types.ObjectId): Promise<Event[]> {
        const declinedInvitations = await this.invitationModel
            .find({
                receiver: userId,
                status: InvitationResponseStatus.DECLINED,
            })
            .populate<{ event: Event }>('event')
            .exec();

        return declinedInvitations
            .map((inv) => inv.event)
            .filter((event): event is Event => event != null);
    }

    async sendInvitation(input: SendInvitationInput): Promise<InvitationDocument> {
        const eventObjectId = new Types.ObjectId(input.eventId);
        const senderObjectId = new Types.ObjectId(input.senderId);

        const event = await this.eventModel.findById(eventObjectId);
        if (!event) {
            throw new NotFoundException('Event not found');
        }

        const isOrganizer = event.organizer.toString() === senderObjectId.toString();

        if (!isOrganizer) {
            if (event.privacy !== Privacy.PUBLIC) {
                throw new ForbiddenException(
                    'Only the organizer can send invitations to private events',
                );
            }

            const senderAccepted = await this.invitationModel.findOne({
                event: eventObjectId,
                receiver: senderObjectId,
                status: InvitationResponseStatus.ACCEPTED,
            });

            if (!senderAccepted) {
                throw new ForbiddenException(
                    'Only the event organizer or accepted guests can send invitations',
                );
            }
        }

        const companionDoc = await this.companionModel.findOne({ ownerId: senderObjectId });
        if (!companionDoc) {
            throw new ForbiddenException('You have no companions to invite');
        }

        const companionIdStrings = companionDoc.companions.map((id) => id.toString());
        const invalidReceivers = input.receiverIds.filter(
            (id) => !companionIdStrings.includes(id),
        );
        if (invalidReceivers.length > 0) {
            throw new ForbiddenException(
                `Some users are not your companions: ${invalidReceivers.join(', ')}`,
            );
        }

        const receiverObjectIds = input.receiverIds.map((id) => new Types.ObjectId(id));

        // Check each receiver's privacy settings for invitation restrictions
        const receiverPrivacyDocs = await Promise.all(
            receiverObjectIds.map((id) => this.privacySettingService.getByOwnerId(id)),
        );

        for (let i = 0; i < receiverObjectIds.length; i++) {
            const rcvPrivacy = receiverPrivacyDocs[i];

            if (rcvPrivacy.whoCanInviteToEvents === PrivacyVisibility.COMPANIONS) {
                const rcvCompanionDoc = await this.companionModel.findOne({
                    ownerId: receiverObjectIds[i],
                });
                const isSenderCompanion = rcvCompanionDoc?.companions.some(
                    (cid) => cid.toString() === senderObjectId.toString(),
                );
                if (!isSenderCompanion) {
                    throw new ForbiddenException(
                        `User ${input.receiverIds[i]} only accepts invitations from their companions`,
                    );
                }
            } else if (rcvPrivacy.whoCanInviteToEvents === PrivacyVisibility.MARKED_COMPANIONS) {
                const isSenderMarked = rcvPrivacy.markedForWhoCanInviteToEvents.some(
                    (mid) => mid.toString() === senderObjectId.toString(),
                );
                if (!isSenderMarked) {
                    throw new ForbiddenException(
                        `You are not in the allowed invitation list of user ${input.receiverIds[i]}`,
                    );
                }
            }
        }

        const bulkOps = receiverObjectIds.map((receiverId) => ({
            updateOne: {
                filter: { event: eventObjectId, sender: senderObjectId, receiver: receiverId },
                update: {
                    $setOnInsert: {
                        event: eventObjectId,
                        sender: senderObjectId,
                        receiver: receiverId,
                        status: InvitationResponseStatus.INVITED,
                    },
                },
                upsert: true,
            },
        }));

        await this.invitationModel.bulkWrite(bulkOps);

        const created = await this.invitationModel
            .findOne({ event: eventObjectId, sender: senderObjectId, receiver: receiverObjectIds[0] })
            .populate('sender')
            .populate('event');

        if (!created) {
            throw new Error('Invitation not found after creation');
        }

        return created;
    }

    async acceptInvitation(
        invitationId: Types.ObjectId,
        userId: Types.ObjectId,
    ): Promise<InvitationDocument> {
        const invitation = await this.invitationModel.findOne({
            _id: invitationId,
            receiver: userId,
        });

        if (!invitation) {
            throw new Error('Invitation not found for this user');
        }

        invitation.status = InvitationResponseStatus.ACCEPTED;
        invitation.respondedAt = new Date();
        await invitation.save();

        return invitation;
    }

    async declineInvitation(
        invitationId: Types.ObjectId,
        userId: Types.ObjectId,
    ): Promise<InvitationDocument> {
        const invitation = await this.invitationModel.findOne({
            _id: invitationId,
            receiver: userId,
        });

        if (!invitation) {
            throw new Error('Invitation not found for this user');
        }

        invitation.status = InvitationResponseStatus.DECLINED;
        invitation.respondedAt = new Date();
        await invitation.save();

        return invitation;
    }
}
