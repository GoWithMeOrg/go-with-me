import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
    PrivacySetting,
    PrivacySettingSchema,
} from './entities/privacy-setting.entity.js';
import { PrivacySettingService } from './privacy-setting.service.js';
import { PrivacySettingResolver } from './privacy-setting.resolver.js';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: PrivacySetting.name, schema: PrivacySettingSchema },
        ]),
    ],
    providers: [PrivacySettingResolver, PrivacySettingService],
    exports: [PrivacySettingService, MongooseModule],
})
export class PrivacySettingModule {}
