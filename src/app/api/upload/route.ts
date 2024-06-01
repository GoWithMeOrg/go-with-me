import { NextRequest, NextResponse } from "next/server";
import { ObjectCannedACL, PutObjectCommand } from "@aws-sdk/client-s3";
import { customAlphabet } from "nanoid";
import { s3Client } from "@/app/api/upload/s3client";
export const POST = async (req: NextRequest) => {
    const data = await req.formData();
    const file = data.get("file");
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];

    if (!(file instanceof File) || !validImageTypes.includes(file.type)) {
        return NextResponse.json("Invalid file type", { status: 400 });
    }

    console.log(file);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileExtension = file.name.split(".").pop();
    const fileName = `${customAlphabet("1234567890abcdef", 10)()}.${fileExtension}`;

    const bucketParams = {
        Bucket: "gowithme",
        Key: fileName,
        Body: buffer,
        ACL: ObjectCannedACL.public_read,
    };

    const result = await s3Client.send(new PutObjectCommand(bucketParams));
    console.log(result);

    return NextResponse.json({
        id: result.ETag,
        url: `${process.env.DO_SPACES_URL}/${bucketParams.Bucket}/${bucketParams.Key}`,
    });
};
