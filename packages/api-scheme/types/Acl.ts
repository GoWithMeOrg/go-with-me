export enum ActionType {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}

export interface IAcl {
  userId: string;
  resourceId: string;
  actionTypes: ActionType[];
}
