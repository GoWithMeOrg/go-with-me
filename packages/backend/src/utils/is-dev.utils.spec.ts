import { isDev } from '@/utils/is-dev.utils.js';
import { ConfigService } from '@nestjs/config';

describe('isDev', () => {
    const createConfigService = (nodeEnv: string | undefined) =>
        ({ getOrThrow: () => nodeEnv }) as unknown as ConfigService;

    it('возвращает true в development', () => {
        expect(isDev(createConfigService('development'))).toBe(true);
    });

    it('возвращает false в production', () => {
        expect(isDev(createConfigService('production'))).toBe(false);
    });

    it('возвращает false для любого другого окружения', () => {
        expect(isDev(createConfigService('test'))).toBe(false);
    });
});
