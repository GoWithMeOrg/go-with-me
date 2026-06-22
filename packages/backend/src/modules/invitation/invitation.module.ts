import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvitationService } from './invitation.service';
import { InvitationResolver } from './invitation.resolver';
import { Invitation, InvitationSchema } from './entities/invitation.entity';
import { EventSchema } from '@/modules/event/entities/event.entity';
import { Companion, CompanionSchema } from '@/modules/companion/entities/companion.entity';
import { PrivacySettingModule } from '@/modules/privacy-setting/privacy-setting.module';
import { PrivacySettingService } from '@/modules/privacy-setting/privacy-setting.service';

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
