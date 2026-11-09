import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CurrentUser } from '@/common/decorators/current-user.decorator.js';
import { PresignedUrlResponse } from '@/modules/storage/dto/presigned-url.response.js';
import { UploadFileInput } from '@/modules/storage/dto/upload-file.input.js';
import { StorageService } from '@/modules/storage/storage.service.js';
import type { StorageFolder } from '@/modules/storage/types/storage-folder.js';
import { User } from '@/modules/user/entities/user.entity.js';

@Resolver()
export class StorageResolver {
    constructor(private readonly storageService: StorageService) {}

    @Mutation(() => PresignedUrlResponse, {
        name: 'getPresignedUrl',
        description: 'Получить пресайнд-ссылку для прямой загрузки файла в MinIO/S3',
    })
    async getPresignedUrl(
        @CurrentUser() user: User,
        @Args('input') input: UploadFileInput,
        @Args('folder', { defaultValue: 'events' }) folder: StorageFolder
    ) {
        return this.storageService.getPresignedUrl(
            input.fileName,
            input.fileType,
            user._id,
            folder
        );
    }

    @Mutation(() => Boolean, {
        name: 'deleteFile',
        description: 'Удалить файл из хранилища по его ключу',
    })
    async deleteFile(@Args('fileKey') fileKey: string): Promise<boolean> {
        return this.storageService.deleteFile(fileKey);
    }
}
