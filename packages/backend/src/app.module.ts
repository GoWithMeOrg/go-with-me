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
import { UserModule } from './user/user.module';

import { UserProfileModule } from './user-profile/user-profile.module';
import { LocationModule } from './location/location.module';
import { CategoryModule } from './category/category.module';
import { InterestModule } from './interest/interest.module';
import { TagModule } from './tag/tag.module';
import { StorageModule } from './storage/storage.module';

import { RolesGuard } from './auth/guard/roles.guard';
import { RoleModule } from './role/role.module';

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
