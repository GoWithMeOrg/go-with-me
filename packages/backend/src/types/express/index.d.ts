import 'express';
import 'express-session';

type PassportCallback = (err: any, user?: Express.User, info?: any) => void;

// Описываем структуру данных пользователя
interface UserPayload {
	id: string;
	email: string;
	firstName?: string;
	lastName?: string;
	provider?: string;
}

// Расширяем тип Request из Express
declare module 'express-serve-static-core' {
        interface Request {
                user?: UserPayload; // Passport добавляет сюда пользователя
                session: import('express-session').Session &
                        Partial<import('express-session').SessionData>;
                logIn: (user: Express.User, done: PassportCallback) => void;
                login: (user: Express.User, done: PassportCallback) => void;
                logOut: (done: (err?: any) => void) => void;
                logout: (done: (err?: any) => void) => void;
        }
}

// Расширяем интерфейс сессии
declare module 'express-session' {
	interface SessionData {
		user?: UserPayload;
	}
}
