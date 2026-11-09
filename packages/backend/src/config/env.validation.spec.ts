import { validateEnv } from '@/config/env.validation.js';

const validEnv = () => ({
    NODE_ENV: 'development',
    PORT: '4000',
    SESSION_SECRET: 'secret',
    ALLOWED_ORIGIN: 'http://localhost:3000',
    MONGODB_URI: 'mongodb://localhost:27017/',
    GOOGLE_CLIENT_ID: 'id',
    GOOGLE_CLIENT_SECRET: 'secret',
    GOOGLE_CALLBACK_URL: 'http://localhost:4000/auth/google/callback',
    S3_ENDPOINT: 'http://localhost:9000',
    S3_ACCESS_KEY: 'key',
    S3_SECRET_KEY: 'secret',
    S3_BUCKET_NAME: 'bucket',
});

describe('validateEnv', () => {
    it('принимает полный конфиг и возвращает его без изменений', () => {
        const env = validEnv();
        expect(validateEnv(env)).toBe(env);
    });

    it('падает со списком всех отсутствующих переменных сразу', () => {
        const env = validEnv();
        delete (env as Partial<ReturnType<typeof validEnv>>).SESSION_SECRET;
        delete (env as Partial<ReturnType<typeof validEnv>>).S3_BUCKET_NAME;

        expect(() => validateEnv(env)).toThrow(/SESSION_SECRET is required/);
        expect(() => validateEnv(env)).toThrow(/S3_BUCKET_NAME is required/);
    });

    it('считает пустую строку отсутствующим значением', () => {
        expect(() => validateEnv({ ...validEnv(), MONGODB_URI: '   ' })).toThrow(
            /MONGODB_URI is required/
        );
    });

    it('проверяет допустимые значения NODE_ENV', () => {
        expect(() => validateEnv({ ...validEnv(), NODE_ENV: 'staging' })).toThrow(
            /NODE_ENV must be one of/
        );
    });

    it('проверяет, что PORT — целое число в допустимом диапазоне', () => {
        expect(() => validateEnv({ ...validEnv(), PORT: 'abc' })).toThrow(/PORT must be an integer/);
        expect(() => validateEnv({ ...validEnv(), PORT: '70000' })).toThrow(
            /PORT must be an integer/
        );
    });
});
