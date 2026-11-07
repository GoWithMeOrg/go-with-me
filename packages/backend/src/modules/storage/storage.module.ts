import { Module } from '@nestjs/common';
import { StorageService } from './storage.service.js';
import { StorageResolver } from './storage.resolver.js';

@Module({
    providers: [StorageResolver, StorageService],
    exports: [StorageService],
})
export class StorageModule {}
