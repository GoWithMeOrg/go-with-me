import { Module } from '@nestjs/common';
import { JoinService } from './join.service';
import { JoinResolver } from './join.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { JoinSchema } from './entities/join.entity';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Join', schema: JoinSchema }])],
    providers: [JoinResolver, JoinService],
    exports: [JoinService],
})
export class JoinModule {}
