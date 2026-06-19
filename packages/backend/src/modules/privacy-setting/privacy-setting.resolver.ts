import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

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
}
