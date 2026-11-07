import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvitationService } from '@/modules/invitation/invitation.service.js';
import { InvitationResolver } from '@/modules/invitation/invitation.resolver.js';
import { Invitation, InvitationSchema } from '@/modules/invitation/entities/invitation.entity.js';
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
