import { Action, Resource } from './Permission';

export type IRole = {
  _id: string;
  name: string;
  permissions: {
    actions: Action[];
    resource: Resource;
  }[];
};
