import { SetMetadata } from '@nestjs/common';

import { Action } from '../../modules/permission/enums/action.enum';

export type RequiredPermission = [Action, string]; // [Действие, Ресурс]

export const PERMISSION_CHECK_KEY = 'permission_check';
export const CheckPermissions = (...params: RequiredPermission[]) =>
    SetMetadata(PERMISSION_CHECK_KEY, params);
