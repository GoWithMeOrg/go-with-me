import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Event } from '@/modules/event/entities/event.entity';
import { Privacy } from '@/modules/event/enum/privacy.enum';
import { Invitation, InvitationDocument } from './entities/invitation.entity';
import { Invited, InvitedDocument } from './entities/invited.entity';
import { InvitationResponseStatus } from './enums/invitation-response.enum';
import { SendInvitationInput } from './dto/send-invitation.input';
import { Companion, CompanionDocument } from '@/modules/companion/entities/companion.entity';

@Injectable()
export class InvitationService {
    constructor(
        @InjectModel(Invitation.name) private invitationModel: Model<InvitationDocument>,
        @InjectModel(Invited.name) private invitedModel: Model<InvitedDocument>,
        @InjectModel(Event.name) private eventModel: Model<Event>,
        @InjectModel(Companion.name) private companionModel: Model<CompanionDocument>,
    ) {}

    async getInvitation(userId: Types.ObjectId): Promise<InvitedDocument[]> {
        return this.invitedModel
            .find({ user: userId })
            .populate({
                path: 'invitation',
                populate: [
                    { path: 'sender', select: '_id name' },
                    { path: 'event', select: '_id name location image time startDate organizer' },
                ],
            })
            .populate('user', '_id')
            .exec();
    }

    async getCompanionInvitationEvent(organizerId: Types.ObjectId): Promise<Event[]> {
        const currentDate = new Date();

        const ownEvents = await this.eventModel
            .find({
                organizer: organizerId,
                startDate: { $gte: currentDate },
            })
            .sort({ startDate: 1 })
            .exec();

        const inviteds = await this.invitedModel
            .find({
                user: organizerId,
                status: InvitationResponseStatus.ACCEPTED,
            })
            .populate({
                path: 'invitation',
                populate: [{ path: 'sender' }, { path: 'event' }],
            })
            .exec();

        const acceptedEvents = inviteds
            .map((invited) => (invited.invitation as any)?.event)
            .filter((event) => event != null);

        return [...ownEvents, ...acceptedEvents];
    }

    async getDeclinedEvents(userId: Types.ObjectId): Promise<Event[]> {
        const declinedInvites = await this.invitedModel
            .find({
                user: userId,
                status: InvitationResponseStatus.DECLINED,
            })
            .populate({
                path: 'invitation',
                populate: { path: 'event' },
            })
            .exec();

        return declinedInvites
            .map((inv) => (inv.invitation as any)?.event)
            .filter(Boolean);
    }

    async sendInvitation(input: SendInvitationInput): Promise<InvitationDocument> {
        const eventObjectId = new Types.ObjectId(input.eventId);
        const senderObjectId = new Types.ObjectId(input.senderId);

        const event = await this.eventModel.findById(eventObjectId);
        if (!event) {
            throw new NotFoundException('Event not found');
        }

        if (event.privacy !== Privacy.PUBLIC) {
            throw new ForbiddenException('Can only invite companions to public events');
        }

        const isOrganizer = event.organizer.toString() === senderObjectId.toString();
        if (!isOrganizer) {
            const eventInvitations = await this.invitationModel.find({ event: eventObjectId });
            const eventInvitationIds = eventInvitations.map((inv) => inv._id);

            const senderAccepted = await this.invitedModel.findOne({
                user: senderObjectId,
                invitation: { $in: eventInvitationIds },
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

        let invitation = await this.invitationModel.findOneAndUpdate(
            { event: eventObjectId, sender: senderObjectId },
            {},
            { upsert: true, new: true },
        );

        const existingInvited = await this.invitedModel.find({ invitation: invitation._id });
        const existingUserIds = existingInvited.map((invited) => invited.user.toString());

        const newUserIds = input.receiverIds.filter(
            (userId) => !existingUserIds.includes(userId),
        );

        if (newUserIds.length > 0) {
            await this.invitedModel.insertMany(
                newUserIds.map((userId) => ({
                    user: new Types.ObjectId(userId),
                    invitation: invitation._id,
                    status: InvitationResponseStatus.INVITED,
                })),
            );
        }

        const result = await this.invitationModel
            .findById(invitation._id)
            .populate('sender')
            .populate('event');

        if (!result) {
            throw new Error('Invitation not found after creation');
        }

        return result;
    }

    async acceptInvitation(
        invitationId: Types.ObjectId,
        userId: Types.ObjectId,
    ): Promise<InvitedDocument> {
        const invited = await this.invitedModel.findOne({
            invitation: invitationId,
            user: userId,
        });

        if (!invited) {
            throw new Error('Invitation not found for this user');
        }

        invited.status = InvitationResponseStatus.ACCEPTED;
        invited.respondedAt = new Date();

        await invited.save();

        const acceptedRecord = await this.invitedModel
            .findOne({ invitation: invitationId, user: userId })
            .exec();

        if (!acceptedRecord) {
            throw new Error('Accepted invitation record not found');
        }

        return acceptedRecord;
    }

    async declineInvitation(
        invitationId: Types.ObjectId,
        userId: Types.ObjectId,
    ): Promise<InvitedDocument> {
        const invited = await this.invitedModel.findOne({
            invitation: invitationId,
            user: userId,
        });

        if (!invited) {
            throw new Error('Invitation not found for this user');
        }

        invited.status = InvitationResponseStatus.DECLINED;
        invited.respondedAt = new Date();

        await invited.save();

        const declinedRecord = await this.invitedModel
            .findOne({ invitation: invitationId, user: userId })
            .exec();

        if (!declinedRecord) {
            throw new Error('Declined invitation record not found');
        }

        return declinedRecord;
    }
}
