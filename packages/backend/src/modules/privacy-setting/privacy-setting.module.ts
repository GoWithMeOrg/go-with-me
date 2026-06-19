import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
    PrivacySetting,
    PrivacySettingSchema,
} from './entities/privacy-setting.entity';
import { PrivacySettingService } from './privacy-setting.service';
import { PrivacySettingResolver } from './privacy-setting.resolver';

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
