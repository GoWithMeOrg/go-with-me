import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Resource, ResourceDocument } from './entities/resource.entity';

@Injectable()
export class ResourceService implements OnModuleInit {
    private readonly EXCLUDED_MODELS = ['SESSION'];

    constructor(
        @InjectConnection() private connection: Connection,
        @InjectModel(Resource.name) private resourceModel: Model<ResourceDocument>
    ) {}

    // Найти все зарегистрированные ресурсы
    async findAllRegistryResource(): Promise<Resource[]> {
        return this.resourceModel.find().sort({ name: 1 }).exec();
    }

    // Найти один по slug (техническому имени)
    async findBySlug(slug: string): Promise<Resource | null> {
        return this.resourceModel.findOne({ slug: slug.toUpperCase() }).exec();
    }

    async searchResources(query?: string): Promise<Resource[]> {
        // 1. Формируем фильтр только если query передан и не пуст
        const filter = query
            ? {
                  $or: [
                      { name: { $regex: query, $options: 'i' } },
                      { slug: { $regex: query, $options: 'i' } },
                  ],
              }
            : {};

        // 2. Выполняем один запрос
        return this.resourceModel
            .find(filter)
            .limit(query ? 5 : 10)
            .sort({ name: 1 })
            .exec();
    }

    // Регистрация нового ресурса
    async registerResource(slug: string, name: string): Promise<Resource> {
        const newResource = new this.resourceModel({
            slug: slug.toUpperCase(),
            name: name,
        });
        return newResource.save();
    }

    async onModuleInit() {
        const modelNames = this.connection.modelNames();

        // 1. Фильтруем список имен моделей
        const filteredModels = modelNames.filter((modelName) => {
            const slug = modelName.toUpperCase();

            // Проверяем: нет ли имени в черном списке и не начинается ли оно с '__' (служебные mongoose)
            return !this.EXCLUDED_MODELS.includes(slug) && !slug.startsWith('__');
        });

        // 2. Работаем уже с отфильтрованным списком
        for (const modelName of filteredModels) {
            const slug = modelName.toUpperCase();

            const exists = await this.resourceModel.exists({ slug });

            if (!exists) {
                console.log(`[ResourceInit] Auto-registering new resource: ${slug}`);
                await this.resourceModel.create({
                    slug,
                    name: this.formatName(modelName), // Используем красивое имя вместо технического
                });
            }
        }
    }

    // Вспомогательный метод для имени
    private formatName(name: string): string {
        return name
            .replace(/([A-Z])/g, ' $1')
            .trim()
            .replace(/^./, (str) => str.toUpperCase());
    }
}
