import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { StorageService } from './storage.service.js';
import { PresignedUrlResponse } from './dto/presigned-url.response.js';
import { UploadFileInput } from './dto/upload-file.input.js';
import type { StorageFolder } from './types/storage-folder.js';
import { CurrentUser } from '@/common/decorators/current-user.decorator.js';
import { User } from '../user/entities/user.entity.js';

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
