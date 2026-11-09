// Валидация окружения на старте: без неё отсутствие, например, S3-переменных
// выясняется только при первой загрузке файла, то есть в рантайме и у клиента.
// Ошибки собираем все сразу, чтобы не чинить их по одной.

const REQUIRED_VARS = [
    'NODE_ENV',
    'PORT',
    'SESSION_SECRET',
    'ALLOWED_ORIGIN',
    'MONGODB_URI',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'GOOGLE_CALLBACK_URL',
    'S3_ENDPOINT',
    'S3_ACCESS_KEY',
    'S3_SECRET_KEY',
    'S3_BUCKET_NAME',
] as const;

const NODE_ENVS = new Set(['development', 'production', 'test']);

export function validateEnv(config: Record<string, unknown>): Record<string, unknown> {
    const errors: string[] = [];

    for (const key of REQUIRED_VARS) {
        const value = config[key];
        if (value === undefined || value === null || String(value).trim() === '') {
            errors.push(`${key} is required`);
        }
    }

    const nodeEnv = config.NODE_ENV === undefined ? undefined : String(config.NODE_ENV);
    if (nodeEnv !== undefined && !NODE_ENVS.has(nodeEnv)) {
        errors.push(`NODE_ENV must be one of ${[...NODE_ENVS].join(', ')}, got "${nodeEnv}"`);
    }

    const port = config.PORT;
    if (port !== undefined && port !== null && String(port).trim() !== '') {
        const parsed = Number(port);
        if (!Number.isInteger(parsed) || parsed <= 0 || parsed > 65535) {
            errors.push(`PORT must be an integer between 1 and 65535, got "${String(port)}"`);
        }
    }

    if (errors.length > 0) {
        throw new Error(`Invalid environment configuration:\n  - ${errors.join('\n  - ')}`);
    }

    // Возвращаем конфиг без изменений: ConfigModule использует результат как
    // источник значений для ConfigService, а нам нужна только проверка.
    return config;
}
