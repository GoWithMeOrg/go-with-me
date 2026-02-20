import { Module } from '@nestjs/common';
import { CompanionService } from './companion.service';
import { CompanionResolver } from './companion.resolver';

@Module({
  providers: [CompanionResolver, CompanionService],
})
export class CompanionModule {}
