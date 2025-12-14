import { Module } from '@nestjs/common';
import { ApolloDriver } from '@nestjs/apollo';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';

import { getGraphQLConfig } from './config/graphql.config';
import { getMongooseConfig } from './config/mongoose.config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { LocationModule } from './location/location.module';
import { CategoryModule } from './category/category.module';
import { InterestModule } from './interest/interest.module';
import { TagModule } from './tag/tag.module';

import { RolesGuard } from './auth/guard/roles.guard';
import { getLoggerConfig } from './config/logger.config';
import { LoggerModule } from 'nestjs-pino';

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

        UserModule,

        UserProfileModule,

        CategoryModule,

        InterestModule,

        LocationModule,

        AuthModule,

        TagModule,
    ],

    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})

// Подключаем LoggingMiddleware глобально ко всем маршрутам
export class AppModule {}
