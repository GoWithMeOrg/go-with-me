import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionSchema } from '@/modules/session/entities/session.entity.js';
import { SessionService } from '@/modules/session/session.service.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Session', schema: SessionSchema }])],
  providers: [SessionService],
  exports: [SessionService, MongooseModule],
})
export class SessionModule {}
