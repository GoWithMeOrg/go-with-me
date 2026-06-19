import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import {
    PrivacySetting,
    PrivacySettingDocument,
} from './entities/privacy-setting.entity';
import { UpdatePrivacySettingInput } from './dto/update-privacy-setting.input';
import { PrivacyVisibility } from './enums/privacy-visibility.enum';

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
            return existing.save();
        }

        return this.privacySettingModel.create({
            ownerId,
            whoCanSeeEvents:
                input.whoCanSeeEvents ?? PrivacyVisibility.EVERYONE,
            whoCanInviteToEvents:
                input.whoCanInviteToEvents ?? PrivacyVisibility.EVERYONE,
        });
    }
}
