import { Roles } from '@/common/decorators/roles.decorator.js';
import { RolesGuard } from '@/common/guards/roles.guard.js';
import { SessionAuthGuard } from '@/common/guards/session-auth.guard.js';
import type { GqlContext } from '@/common/types/graphql-context.js';
import { User } from '@/modules/user/entities/user.entity.js';
import { UseGuards } from '@nestjs/common';
import { Context, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => User)
export class AuthResolver {
    @Query(() => User, { nullable: true })
    @UseGuards(SessionAuthGuard)
    async session(@Context() context: GqlContext): Promise<Partial<User> | null> {
        const user = context.req.user;
        if (user) {
            console.log('Session query executed, user:', user);
        }
        return user || null;
    }

    // резолвер с требованием роли ADMIN
    @Query(() => String)
    @UseGuards(SessionAuthGuard, RolesGuard)
    @Roles('admin')
    async adminRoute(): Promise<string> {
        return 'Доступ только для администраторов';
    }

    // резолвер с требованиями ролей админа и модератора
    @Query(() => String)
    @UseGuards(SessionAuthGuard, RolesGuard)
    @Roles('admin', 'moderator')
    async moderatorRoute(): Promise<string> {
        return 'Доступ для администраторов и модераторов';
    }
}
