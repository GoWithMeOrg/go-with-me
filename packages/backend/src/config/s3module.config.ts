import { ConfigService } from '@nestjs/config';
import { S3ModuleOptions } from 'nestjs-s3';

export async function getS3ModuleConfig(configService: ConfigService): Promise<S3ModuleOptions> {
    return {
        config: {
            credentials: {
                accessKeyId: configService.getOrThrow<string>('S3_ACCESS_KEY'),
                secretAccessKey: configService.getOrThrow<string>('S3_SECRET_KEY'),
            },
            endpoint: configService.getOrThrow<string>('S3_ENDPOINT'),
            region: configService.get<string>('S3_REGION') || 'us-east-1',
            forcePathStyle: true,
            requestChecksumCalculation: 'WHEN_REQUIRED',
        },
    };
}
