export interface GetPresignedUrlData {
    getPresignedUrl: {
        presignedUrl: string;
        publicUrl: string;
    };
}

export interface UploadData {
    file: File;
    presignUrl: string;
}
