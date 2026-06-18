import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvitationService } from './invitation.service';
import { InvitationResolver } from './invitation.resolver';
import { Invitation, InvitationSchema } from './entities/invitation.entity';
import { Invited, InvitedSchema } from './entities/invited.entity';
import { EventSchema } from '@/modules/event/entities/event.entity';
import { Companion, CompanionSchema } from '@/modules/companion/entities/companion.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Invitation.name, schema: InvitationSchema },
            { name: Invited.name, schema: InvitedSchema },
            { name: 'Event', schema: EventSchema },
            { name: Companion.name, schema: CompanionSchema },
        ]),
    ],
    providers: [InvitationResolver, InvitationService],
    exports: [InvitationService],
})
export class InvitationModule {}
