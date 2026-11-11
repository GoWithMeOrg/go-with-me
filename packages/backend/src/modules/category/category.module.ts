import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoryResolver } from '@/modules/category/category.resolver.js';
import { CategoryService } from '@/modules/category/category.service.js';
import { CategorySchema } from '@/modules/category/entities/category.entity.js';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }])],
    providers: [CategoryResolver, CategoryService],
    exports: [CategoryService],
})
export class CategoryModule {}
