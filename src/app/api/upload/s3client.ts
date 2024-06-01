import { S3 } from "@aws-sdk/client-s3";

export const s3Client = new S3({
    endpoint: process.env.DO_SPACES_URL,
    region: "fra1",
    credentials: {
        accessKeyId: process.env.DO_SPACES_ACCESS_KEY as string,
        secretAccessKey: process.env.DO_SPACES_SECRET_KEY as string,
    },
});
