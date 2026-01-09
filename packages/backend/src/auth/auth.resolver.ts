import { Resolver, Query, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { SessionAuthGuard } from './guard/session-auth.guard';
import { RolesGuard } from './guard/roles.guard';

import { User } from 'src/user/entities/user.entity';

import { Roles } from './decorators/roles.decorator';

import type { GqlContext } from 'src/auth/types/graphql-context';

import { UserRole } from './types/roles.enum';
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
    @Roles(UserRole.ADMIN)
    async adminRoute(@Context() context: GqlContext): Promise<string> {
        return 'Доступ только для администраторов';
    }

    // резолвер с требованиями ролей админа и модератора
    @Query(() => String)
    @UseGuards(SessionAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MODERATOR)
    async moderatorRoute(@Context() context: GqlContext): Promise<string> {
        return 'Доступ для администраторов и модераторов';
    }
}
