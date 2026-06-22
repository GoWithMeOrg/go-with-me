import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import {
    PrivacySetting,
    PrivacySettingDocument,
} from './entities/privacy-setting.entity';
import { UpdatePrivacySettingInput } from './dto/update-privacy-setting.input';
import { PrivacyVisibility } from './enums/privacy-visibility.enum';

const isMarkedCompanions = (v: string | undefined | null) =>
    v === PrivacyVisibility.MARKED_COMPANIONS;

@Injectable()
export class PrivacySettingService {
    constructor(
        @InjectModel(PrivacySetting.name)
        private privacySettingModel: Model<PrivacySettingDocument>,
    ) {}

    async getByOwnerId(
        ownerId: Types.ObjectId,
    ): Promise<PrivacySettingDocument> {
        const existing = await this.privacySettingModel
            .findOne({ ownerId })
            .exec();

        if (existing) {
            return existing;
        }

        return this.privacySettingModel.create({
            ownerId,
            whoCanSeeEvents: PrivacyVisibility.EVERYONE,
            whoCanInviteToEvents: PrivacyVisibility.EVERYONE,
        });
    }

    async update(
        ownerId: Types.ObjectId,
        input: UpdatePrivacySettingInput,
    ): Promise<PrivacySettingDocument> {
        const existing = await this.privacySettingModel
            .findOne({ ownerId })
            .exec();

        if (existing) {
            existing.whoCanSeeEvents =
                input.whoCanSeeEvents ?? existing.whoCanSeeEvents;
            existing.whoCanInviteToEvents =
                input.whoCanInviteToEvents ?? existing.whoCanInviteToEvents;

            if (input.markedForWhoCanSeeEvents !== undefined) {
                existing.markedForWhoCanSeeEvents = input.markedForWhoCanSeeEvents ?? [];
            } else if (input.whoCanSeeEvents !== undefined && !isMarkedCompanions(existing.whoCanSeeEvents)) {
                existing.markedForWhoCanSeeEvents = [];
            }

            if (input.markedForWhoCanInviteToEvents !== undefined) {
                existing.markedForWhoCanInviteToEvents = input.markedForWhoCanInviteToEvents ?? [];
            } else if (input.whoCanInviteToEvents !== undefined && !isMarkedCompanions(existing.whoCanInviteToEvents)) {
                existing.markedForWhoCanInviteToEvents = [];
            }

            return existing.save();
        }

        return this.privacySettingModel.create({
            ownerId,
            whoCanSeeEvents:
                input.whoCanSeeEvents ?? PrivacyVisibility.EVERYONE,
            whoCanInviteToEvents:
                input.whoCanInviteToEvents ?? PrivacyVisibility.EVERYONE,
            markedForWhoCanSeeEvents: input.markedForWhoCanSeeEvents ?? [],
            markedForWhoCanInviteToEvents: input.markedForWhoCanInviteToEvents ?? [],
        });
    }

    async getByOwnerIds(
        ownerIds: Types.ObjectId[],
    ): Promise<PrivacySettingDocument[]> {
        const objectIds = ownerIds.map(
            (id) => new Types.ObjectId(id.toString()),
        );

        const settings = await this.privacySettingModel
            .find({ ownerId: { $in: objectIds } })
            .exec();

        const foundIds = new Set(
            settings.map((s) => s.ownerId.toString()),
        );

        for (const id of objectIds) {
            if (!foundIds.has(id.toString())) {
                settings.push(
                    await this.privacySettingModel.create({
                        ownerId: id,
                        whoCanSeeEvents: PrivacyVisibility.EVERYONE,
                        whoCanInviteToEvents: PrivacyVisibility.EVERYONE,
                    }),
                );
            }
        }

        return settings;
    }

    async addMarkedForWhoCanSeeEvents(
        ownerId: Types.ObjectId,
        companionIds: Types.ObjectId[],
    ): Promise<PrivacySettingDocument> {
        return this.privacySettingModel.findOneAndUpdate(
            { ownerId },
            {
                $addToSet: { markedForWhoCanSeeEvents: { $each: companionIds } },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        ).exec();
    }

    async removeMarkedForWhoCanSeeEvents(
        ownerId: Types.ObjectId,
        companionId: Types.ObjectId,
    ): Promise<PrivacySettingDocument> {
        const doc = await this.privacySettingModel.findOneAndUpdate(
            { ownerId },
            { $pull: { markedForWhoCanSeeEvents: companionId } },
            { new: true },
        ).exec();
        return doc ?? (await this.getByOwnerId(ownerId));
    }

    async addMarkedForWhoCanInviteToEvents(
        ownerId: Types.ObjectId,
        companionIds: Types.ObjectId[],
    ): Promise<PrivacySettingDocument> {
        return this.privacySettingModel.findOneAndUpdate(
            { ownerId },
            {
                $addToSet: { markedForWhoCanInviteToEvents: { $each: companionIds } },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        ).exec();
    }

    async removeMarkedForWhoCanInviteToEvents(
        ownerId: Types.ObjectId,
        companionId: Types.ObjectId,
    ): Promise<PrivacySettingDocument> {
        const doc = await this.privacySettingModel.findOneAndUpdate(
            { ownerId },
            { $pull: { markedForWhoCanInviteToEvents: companionId } },
            { new: true },
        ).exec();
        return doc ?? (await this.getByOwnerId(ownerId));
    }
}
