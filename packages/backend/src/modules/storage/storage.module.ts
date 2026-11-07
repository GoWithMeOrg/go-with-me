import { Module } from '@nestjs/common';
import { StorageService } from '@/modules/storage/storage.service.js';
import { StorageResolver } from '@/modules/storage/storage.resolver.js';

@Module({
    providers: [StorageResolver, StorageService],
    exports: [StorageService],
})
export class StorageModule {}
