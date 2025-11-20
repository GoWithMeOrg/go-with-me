export interface Session {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
}

export type UpdateSession = (updateData?: Partial<Session>) => void;

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'loading';

export type SessionState =
    | {
          update: UpdateSession;
          data: Session;
          status: 'authenticated';
      }
    | {
          update: UpdateSession;
          data: null;
          status: 'unauthenticated' | 'loading';
      };
