import { registerEnumType } from '@nestjs/graphql';

export enum Action {
    READ = 'READ',
    CREATE = 'CREATE',
    EDIT = 'EDIT',
    DELETE = 'DELETE',
}

registerEnumType(Action, { name: 'Action' });
