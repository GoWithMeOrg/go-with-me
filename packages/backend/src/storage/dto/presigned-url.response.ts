import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType() // Этот декоратор говорит GraphQL, что это тип данных в схеме
export class PresignedUrlResponse {
    @Field(() => String, { description: 'URL для загрузки файла (метод PUT)' })
    presignedUrl: string;

    @Field(() => String, { description: 'Путь к файлу для сохранения в БД (Key)' })
    fileKey: string;

    @Field(() => String, { description: 'Публичная ссылка для отображения' })
    publicUrl: string;
}
