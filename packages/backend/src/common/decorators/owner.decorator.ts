import { SetMetadata } from '@nestjs/common';

export const ENTITY_TYPE_KEY = 'entityType';

export const CheckOwner = (entityName: string) => SetMetadata(ENTITY_TYPE_KEY, entityName);
