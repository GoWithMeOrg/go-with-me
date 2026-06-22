import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Types } from 'mongoose';

import { PrivacySetting } from './entities/privacy-setting.entity';
import { PrivacySettingService } from './privacy-setting.service';
import { UpdatePrivacySettingInput } from './dto/update-privacy-setting.input';
import { SessionAuthGuard } from '@/common/guards/session-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { User } from '@/modules/user/entities/user.entity';

@Resolver(() => PrivacySetting)
@UseGuards(SessionAuthGuard)
export class PrivacySettingResolver {
    constructor(
        private readonly privacySettingService: PrivacySettingService,
    ) {}

    @Query(() => PrivacySetting, {
        name: 'myPrivacySetting',
        description: 'Получить настройки приватности текущего пользователя',
    })
    getMyPrivacySetting(
        @CurrentUser() user: User,
    ): Promise<PrivacySetting> {
        return this.privacySettingService.getByOwnerId(user._id);
    }

    @Query(() => PrivacySetting, {
        name: 'privacySettingByUserId',
        description: 'Получить настройки приватности пользователя по ID',
    })
    privacySettingByUserId(
        @Args('user_id', { type: () => ID }) userId: Types.ObjectId,
    ): Promise<PrivacySetting> {
        return this.privacySettingService.getByOwnerId(
            new Types.ObjectId(userId.toString()),
        );
    }

    @Query(() => [PrivacySetting], {
        name: 'privacySettingsForUsers',
        description: 'Получить настройки приватности для нескольких пользователей',
    })
    privacySettingsForUsers(
        @Args('user_ids', { type: () => [ID] }) userIds: Types.ObjectId[],
    ): Promise<PrivacySetting[]> {
        return this.privacySettingService.getByOwnerIds(userIds);
    }

    @Mutation(() => PrivacySetting, {
        name: 'updatePrivacySetting',
        description: 'Обновить настройки приватности',
    })
    updatePrivacySetting(
        @CurrentUser() user: User,
        @Args('input') input: UpdatePrivacySettingInput,
    ): Promise<PrivacySetting> {
        return this.privacySettingService.update(user._id, input);
    }

    @Mutation(() => PrivacySetting, {
        name: 'addMarkedForWhoCanSeeEvents',
        description: 'Добавить компаньонов в список отмеченных для whoCanSeeEvents',
    })
    addMarkedForWhoCanSeeEvents(
        @CurrentUser() user: User,
        @Args('companion_ids', { type: () => [ID] }) companionIds: Types.ObjectId[],
    ): Promise<PrivacySetting> {
        return this.privacySettingService.addMarkedForWhoCanSeeEvents(user._id, companionIds);
    }

    @Mutation(() => PrivacySetting, {
        name: 'removeMarkedForWhoCanSeeEvents',
        description: 'Убрать компаньона из списка отмеченных для whoCanSeeEvents',
    })
    removeMarkedForWhoCanSeeEvents(
        @CurrentUser() user: User,
        @Args('companion_id', { type: () => ID }) companionId: Types.ObjectId,
    ): Promise<PrivacySetting> {
        return this.privacySettingService.removeMarkedForWhoCanSeeEvents(user._id, companionId);
    }

    @Mutation(() => PrivacySetting, {
        name: 'addMarkedForWhoCanInviteToEvents',
        description: 'Добавить компаньонов в список отмеченных для whoCanInviteToEvents',
    })
    addMarkedForWhoCanInviteToEvents(
        @CurrentUser() user: User,
        @Args('companion_ids', { type: () => [ID] }) companionIds: Types.ObjectId[],
    ): Promise<PrivacySetting> {
        return this.privacySettingService.addMarkedForWhoCanInviteToEvents(user._id, companionIds);
    }

    @Mutation(() => PrivacySetting, {
        name: 'removeMarkedForWhoCanInviteToEvents',
        description: 'Убрать компаньона из списка отмеченных для whoCanInviteToEvents',
    })
    removeMarkedForWhoCanInviteToEvents(
        @CurrentUser() user: User,
        @Args('companion_id', { type: () => ID }) companionId: Types.ObjectId,
    ): Promise<PrivacySetting> {
        return this.privacySettingService.removeMarkedForWhoCanInviteToEvents(user._id, companionId);
    }
}
