import { Module } from '@nestjs/common';
import { ApolloDriver } from '@nestjs/apollo';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'nestjs-pino';
import { S3Module } from 'nestjs-s3';

import { getGraphQLConfig } from './config/graphql.config';
import { getMongooseConfig } from './config/mongoose.config';
import { getLoggerConfig } from './config/logger.config';
import { getS3ModuleConfig } from './config/s3module.config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';

import { UserProfileModule } from './modules/user-profile/user-profile.module';
import { LocationModule } from './modules/location/location.module';
import { CategoryModule } from './modules/category/category.module';
import { InterestModule } from './modules/interest/interest.module';
import { TagModule } from './modules/tag/tag.module';
import { StorageModule } from './modules/storage/storage.module';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';
import { ResourceModule } from './modules/resource/resource.module';

import { RolesGuard } from './common/guards/roles.guard';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
        }),

        LoggerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: getLoggerConfig,
            inject: [ConfigService],
        }),

        GraphQLModule.forRootAsync({
            driver: ApolloDriver,
            imports: [ConfigModule],
            useFactory: getGraphQLConfig,
            inject: [ConfigService],
        }),

        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: getMongooseConfig,
            inject: [ConfigService],
        }),

        S3Module.forRootAsync({
            imports: [ConfigModule],
            useFactory: getS3ModuleConfig,
            inject: [ConfigService],
        }),

        UserModule,

        UserProfileModule,

        CategoryModule,

        InterestModule,

        LocationModule,

        AuthModule,

        TagModule,

        StorageModule,

        RoleModule,

        PermissionModule,

        // EntityRegistryModule,

        ResourceModule,
    ],

    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class AppModule {}
