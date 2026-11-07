import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './entities/category.entity.js';
import { CategoryResolver } from './category.resolver.js';
import { CategoryService } from './category.service.js';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }])],
    providers: [CategoryResolver, CategoryService],
    exports: [CategoryService],
})
export class CategoryModule {}
