import { NextRequest, NextResponse } from "next/server";
import { DeleteObjectCommand, GetObjectCommand, ObjectCannedACL, PutObjectCommand } from "@aws-sdk/client-s3";
import { customAlphabet } from "nanoid";
import { s3Client } from "@/app/api/upload/s3client";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { validImageTypes } from "@/constants/constants";
export const POST = async (req: NextRequest) => {
    const data = await req.formData();
    const file = (data.get("file") as File) || null;

    if (!(file instanceof File) || !validImageTypes.includes(file.type)) {
        return NextResponse.json("Invalid file type", { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileExtension = file.name.split(".").pop();
    const fileName = `${customAlphabet("1234567890abcdef", 10)()}.${fileExtension}`;

    const bucketParams = {
        Bucket: process.env.DO_SPACES_BUCKET as string,
        Key: fileName,
        Body: buffer,
        ACL: ObjectCannedACL.public_read,
    };

    const presignUrl = await getSignedUrl(s3Client, new PutObjectCommand(bucketParams), {
        expiresIn: 3600,
    });

    const fileUrl = `${process.env.DO_SPACES_URL}/${bucketParams.Bucket}/${bucketParams.Key}`;

    if (req.method === "POST") {
        return NextResponse.json({ presignUrl, fileUrl });
    }
};

export const PUT = async (req: NextRequest) => {
    const data = await req.formData();
    const file = (data.get("file") as File) || null;

    if (!(file instanceof File) || !validImageTypes.includes(file.type)) {
        return NextResponse.json("Invalid file type", { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileExtension = file.name.split(".").pop();
    const fileName = `${customAlphabet("1234567890abcdef", 10)()}.${fileExtension}`;

    const bucketParams = {
        Bucket: process.env.DO_SPACES_BUCKET as string,
        Key: fileName,
        Body: buffer,
        ACL: ObjectCannedACL.public_read,
    };

    const uploadFileToPresignUrl = await s3Client.send(new PutObjectCommand(bucketParams));

    if (req.method === "PUT") {
        console.log(uploadFileToPresignUrl);
        return NextResponse.json({
            id: uploadFileToPresignUrl.ETag,
        });
    }
};

export const DELETE = async (req: NextRequest) => {
    const data = await req.json();
    const fileName = data.fileName;
    const bucketDelete = {
        Bucket: process.env.DO_SPACES_BUCKET as string,
        Key: fileName,
    };

    if (req.method === "DELETE") {
        const deleteFile = new DeleteObjectCommand(bucketDelete);
        const sendDeleteFile = await s3Client.send(deleteFile);
        return NextResponse.json({ message: `Файл ${fileName} удален` });
    }
};
