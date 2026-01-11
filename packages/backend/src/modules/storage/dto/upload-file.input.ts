import { Field, InputType } from '@nestjs/graphql';
import { Matches } from 'class-validator';

@InputType()
export class UploadFileInput {
    @Field(() => String, { description: 'Оригинальное имя файла' })
    @Matches(/\.(jpg|jpeg|png|webp|gif)$/i, {
        message: 'Разрешены только изображения (jpg, png, webp, gif)',
    })
    fileName: string;

    @Field(() => String, { description: 'MIME-тип файла' })
    @Matches(/^image\/(jpeg|png|webp|gif)$/, {
        message:
            'Недопустимый MIME-тип. Разрешены только image/jpeg, image/png, image/webp, image/gif',
    })
    fileType: string;
}
