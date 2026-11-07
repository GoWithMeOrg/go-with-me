import { Module } from '@nestjs/common';
import { ApolloDriver } from '@nestjs/apollo';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { LoggerModule } from 'nestjs-pino';
import { S3Module } from 'nestjs-s3';

import { getGraphQLConfig } from './config/graphql.config.js';
import { getMongooseConfig } from './config/mongoose.config.js';
import { getLoggerConfig } from './config/logger.config.js';
import { getS3ModuleConfig } from './config/s3module.config.js';

import { AuthModule } from './auth/auth.module.js';
import { UserModule } from './modules/user/user.module.js';

import { UserProfileModule } from './modules/user-profile/user-profile.module.js';
import { LocationModule } from './modules/location/location.module.js';
import { CategoryModule } from './modules/category/category.module.js';
import { InterestModule } from './modules/interest/interest.module.js';
import { TagModule } from './modules/tag/tag.module.js';
import { StorageModule } from './modules/storage/storage.module.js';
import { RoleModule } from './modules/role/role.module.js';
import { PermissionModule } from './modules/permission/permission.module.js';
import { ResourceModule } from './modules/resource/resource.module.js';

import { RolesGuard } from './common/guards/roles.guard.js';
import { SeedsModule } from './modules/seeds/seeds.module.js';
import { CompanionModule } from './modules/companion/companion.module.js';
import { CompanionRequestModule } from './modules/companion-request/companion-request.module.js';
import { EventModule } from './modules/event/event.module.js';
import { LikeModule } from './modules/like/like.module.js';
import { JoinModule } from './modules/join/join.module.js';
import { CommentModule } from './modules/comment/comment.module.js';
import { InvitationModule } from './modules/invitation/invitation.module.js';
import { PrivacySettingModule } from './modules/privacy-setting/privacy-setting.module.js';

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
            imports: [ConfigModule, UserModule],
            useFactory: getGraphQLConfig,
            inject: [ConfigService, getModelToken('User')],
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

        ResourceModule,

        SeedsModule,

        CompanionModule,

        CompanionRequestModule,

        EventModule,

        LikeModule,

        JoinModule,

        CommentModule,

        InvitationModule,

        PrivacySettingModule,
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
