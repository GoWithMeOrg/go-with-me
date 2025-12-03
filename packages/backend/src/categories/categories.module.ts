import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesSchema } from './entities/category.entity';
import { CategoriesResolver } from './categories.resolver';
import { CategoriesService } from './categories.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Categories', schema: CategoriesSchema }])],
    providers: [CategoriesResolver, CategoriesService],
    exports: [CategoriesService],
})
export class CategoriesModule {}
