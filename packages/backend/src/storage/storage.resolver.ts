import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { StorageService } from './storage.service';
import { PresignedUrlResponse } from './dto/presigned-url.response';
import { UploadFileInput } from './dto/upload-file.input';
import type { StorageFolder } from './types/storage-folder';

@Resolver()
export class StorageResolver {
    constructor(private readonly storageService: StorageService) {}

    @Mutation(() => PresignedUrlResponse, {
        name: 'getPresignedUrl',
        description: 'Получить пресайнд-ссылку для прямой загрузки файла в MinIO/S3',
    })
    async getPresignedUrl(
        @Args('input') input: UploadFileInput,
        @Args('entityId') entityId: string,
        @Args('folder', { defaultValue: 'events' }) folder: StorageFolder
    ) {
        return this.storageService.getPresignedUrl(
            input.fileName,
            input.fileType,
            entityId,
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
