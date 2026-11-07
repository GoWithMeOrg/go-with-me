import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionSchema } from './entities/session.entity.js';
import { SessionService } from './session.service.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Session', schema: SessionSchema }])],
  providers: [SessionService],
  exports: [SessionService, MongooseModule],
})
export class SessionModule {}
