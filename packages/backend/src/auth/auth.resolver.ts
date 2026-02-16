import { Resolver, Query, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { SessionAuthGuard } from '../common/guards/session-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

import { User } from 'src/modules/user/entities/user.entity';

import { Roles } from '../common/decorators/roles.decorator';

import type { GqlContext } from 'src/common/types/graphql-context';

@Resolver(() => User)
export class AuthResolver {
    @Query(() => User, { nullable: true })
    @UseGuards(SessionAuthGuard)
    async session(@Context() context: GqlContext): Promise<Partial<User> | null> {
        return context.req.user || null;
    }

    // резолвер с требованием роли ADMIN
    @Query(() => String)
    @UseGuards(SessionAuthGuard, RolesGuard)
    @Roles('admin')
    async adminRoute(@Context() context: GqlContext): Promise<string> {
        return 'Доступ только для администраторов';
    }

    // резолвер с требованиями ролей админа и модератора
    @Query(() => String)
    @UseGuards(SessionAuthGuard, RolesGuard)
    @Roles('admin', 'moderator')
    async moderatorRoute(@Context() context: GqlContext): Promise<string> {
        return 'Доступ для администраторов и модераторов';
    }
}
