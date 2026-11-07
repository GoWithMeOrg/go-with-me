import { Module } from '@nestjs/common';
import { JoinService } from './join.service.js';
import { JoinResolver } from './join.resolver.js';
import { MongooseModule } from '@nestjs/mongoose';
import { JoinSchema } from './entities/join.entity.js';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Join', schema: JoinSchema }])],
    providers: [JoinResolver, JoinService],
    exports: [JoinService],
})
export class JoinModule {}
