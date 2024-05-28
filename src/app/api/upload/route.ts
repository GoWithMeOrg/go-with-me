import { NextRequest, NextResponse } from "next/server";
import { ObjectCannedACL, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { s3Client } from "@/app/api/upload/s3client";
export const POST = async (req: NextRequest) => {
    const data = await req.formData();
    const file = data.get("file");

    if (!(file instanceof File)) {
        return NextResponse.json("No file");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileExtension = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExtension}`;

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
