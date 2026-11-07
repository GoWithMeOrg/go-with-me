import { JoinSchema } from '@/modules/join/entities/join.entity.js';
import { JoinResolver } from '@/modules/join/join.resolver.js';
import { JoinService } from '@/modules/join/join.service.js';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Join', schema: JoinSchema }])],
    providers: [JoinResolver, JoinService],
    exports: [JoinService],
})
export class JoinModule {}
