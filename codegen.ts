import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: "./src/apollo/api.graphql",
    generates: {
        "./src/apollo/resolvers-types.ts": {
            plugins: ["typescript", "typescript-resolvers"],
        },
    },
};
export default config;
