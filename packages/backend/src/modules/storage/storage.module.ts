import { Module } from '@nestjs/common';

import { StorageResolver } from '@/modules/storage/storage.resolver.js';
import { StorageService } from '@/modules/storage/storage.service.js';

@Module({
    providers: [StorageResolver, StorageService],
    exports: [StorageService],
})
export class StorageModule {}
