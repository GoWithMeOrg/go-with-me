import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
    PrivacySetting,
    PrivacySettingSchema,
} from '@/modules/privacy-setting/entities/privacy-setting.entity.js';
import { PrivacySettingResolver } from '@/modules/privacy-setting/privacy-setting.resolver.js';
import { PrivacySettingService } from '@/modules/privacy-setting/privacy-setting.service.js';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: PrivacySetting.name, schema: PrivacySettingSchema }]),
    ],
    providers: [PrivacySettingResolver, PrivacySettingService],
    exports: [PrivacySettingService, MongooseModule],
})
export class PrivacySettingModule {}
