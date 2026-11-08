import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { createDefaultEsmPreset, pathsToModuleNameMapper } from 'ts-jest';

const nodeRequire = createRequire(import.meta.url);

const readJson = (file) => JSON.parse(readFileSync(new URL(file, import.meta.url), 'utf8'));

const { compilerOptions } = readJson('./tsconfig.json');

// graphql 17 резолвится в index.mjs (условие "module-sync"), но CJS-пакеты
// вроде graphql-tag и graphql-ws тянут его через require(), а Jest запрещает
// require(esm) в цикле. Подсовываем CJS-сборку того же пакета.
const graphqlCjs = nodeRequire.resolve('graphql').replace(/([\\/])index\.mjs$/, '$1index.js');

/** @type {import('jest').Config} */
export default {
    ...createDefaultEsmPreset({ tsconfig: 'tsconfig.spec.json' }),
    rootDir: '.',
    testEnvironment: 'node',
    testRegex: '.*\\.spec\\.ts$',
    moduleNameMapper: {
        ...pathsToModuleNameMapper(compilerOptions.paths, {
            prefix: '<rootDir>',
            useESM: true,
        }),
        '^graphql$': graphqlCjs,
    },
    coverageDirectory: '<rootDir>/coverage',
    collectCoverageFrom: ['src/**/*.ts', '!src/**/*.module.ts', '!src/main.ts', '!src/**/*.d.ts'],
};
