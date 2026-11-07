import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvitationService } from './invitation.service.js';
import { InvitationResolver } from './invitation.resolver.js';
import { Invitation, InvitationSchema } from './entities/invitation.entity.js';
import { EventSchema } from '@/modules/event/entities/event.entity.js';
import { Companion, CompanionSchema } from '@/modules/companion/entities/companion.entity.js';
import { PrivacySettingModule } from '@/modules/privacy-setting/privacy-setting.module.js';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Invitation.name, schema: InvitationSchema },
            { name: 'Event', schema: EventSchema },
            { name: Companion.name, schema: CompanionSchema },
        ]),
        PrivacySettingModule,
    ],
    providers: [InvitationResolver, InvitationService],
    exports: [InvitationService],
})
export class InvitationModule {}
