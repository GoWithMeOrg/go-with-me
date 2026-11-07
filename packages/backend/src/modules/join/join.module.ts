import { Module } from '@nestjs/common';
import { JoinService } from '@/modules/join/join.service.js';
import { JoinResolver } from '@/modules/join/join.resolver.js';
import { MongooseModule } from '@nestjs/mongoose';
import { JoinSchema } from '@/modules/join/entities/join.entity.js';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Join', schema: JoinSchema }])],
    providers: [JoinResolver, JoinService],
    exports: [JoinService],
})
export class JoinModule {}
