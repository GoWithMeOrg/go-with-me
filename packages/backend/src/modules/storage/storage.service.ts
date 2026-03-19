import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { customAlphabet } from 'nanoid';
import { InjectS3 } from 'nestjs-s3';
import { PresignedUrlResponse } from './dto/presigned-url.response';
import { StorageFolder } from './types/storage-folder';

@Injectable()
export class StorageService {
    private readonly nanoid = customAlphabet('1234567890abcdef', 10);

    constructor(
        private readonly configService: ConfigService,
        @InjectS3() private readonly s3Client: S3Client
    ) {}

    async getPresignedUrl(
        fileName: string,
        fileType: string,
        user_id: string,
        folder: StorageFolder
    ): Promise<PresignedUrlResponse> {
        const bucket = this.configService.getOrThrow('S3_BUCKET_NAME');
        const fileExtension = fileName.split('.').pop();
        const fileKey = `${folder}/${user_id}/${this.nanoid()}.${fileExtension}`;

        const command = new PutObjectCommand({
            Bucket: bucket,
            Key: fileKey,
            ContentType: fileType, // Обязательно, чтобы ссылка работала только для этого типа
        });

        const presignedUrl = await getSignedUrl(this.s3Client, command, {
            expiresIn: 3600,
            signableHeaders: new Set(['content-type']), // Фиксируем заголовки
        });

        return {
            presignedUrl,
            fileKey,
            publicUrl: `${this.configService.get('S3_ENDPOINT')}/${bucket}/${fileKey}`,
        };
    }

    async deleteFile(fileKey: string): Promise<boolean> {
        try {
            const bucket = this.configService.getOrThrow<string>('S3_BUCKET_NAME');

            await this.s3Client.send(
                new DeleteObjectCommand({
                    Bucket: bucket,
                    Key: fileKey,
                })
            );

            console.log(`File deleted successfully: ${fileKey}`);
            return true;
        } catch (error) {
            console.error(`Error deleting file from S3: ${error.message}`);
            // Возвращаем false, чтобы фронтенд знал, что удаление не прошло
            return false;
        }
    }
}
