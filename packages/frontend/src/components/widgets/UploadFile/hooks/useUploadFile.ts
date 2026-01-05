import { useEffect, useRef, useState } from 'react';
import { DELETE_FILE_MUTATION, GET_PRESIGNED_URL } from '@/app/graphql/mutations/upload';
import { validImageTypes } from '@/constants/constants';
import { useMutation } from '@apollo/client/react';

import { GetPresignedUrlData } from '../interfaces/GetPresignedUrlData';
import { IUploadFile } from '../interfaces/IUploadFile';

export const useUploadFile = ({ onChange, folder, entityId }: IUploadFile) => {
    const uploadRef = useRef<HTMLInputElement>(null);
    const [url, setUrl] = useState<string | null>(null);
    const [presignUrl, setPresignUrl] = useState<string | null>(null);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const [getPresignedUrlMutation] = useMutation<GetPresignedUrlData>(GET_PRESIGNED_URL);
    const [deleteFileMutation] = useMutation(DELETE_FILE_MUTATION);

    useEffect(() => {
        if (url !== null) {
            onChange?.(url);
        }
    }, [onChange, url]);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!validImageTypes.includes(file.type)) {
            console.error('Invalid file type. Please select an image.');
            return;
        } else {
            setUploadedFile(file);
            getPresignedUrl(file);
        }
    };

    const getPresignedUrl = async (uploadedFile: File) => {
        const { data } = await getPresignedUrlMutation({
            variables: {
                input: {
                    fileName: uploadedFile.name,
                    fileType: uploadedFile.type,
                },
                entityId: entityId,
                folder: folder,
            },
        });

        if (data?.getPresignedUrl) {
            const { presignedUrl, publicUrl } = data.getPresignedUrl;

            setPresignUrl(presignedUrl);
            setUrl(publicUrl);
        }
    };

    const onSubmitFile = async (uploadedFile: File, preUrl: string) => {
        if (!uploadedFile && !preUrl) return;
        const response = await fetch(preUrl, {
            method: 'PUT',
            body: uploadedFile,
            headers: {
                'Content-Type': uploadedFile.type, // Обязательно! Должно совпадать с подписью
            },
        });
        if (!response.ok) {
            throw new Error('Error saving file');
        }
    };

    const deleteFile = async (fileUrl: string) => {
        const url = new URL(fileUrl);
        const key = url.pathname.replace(/^\/[^\/]+\//, '');
        const fileKey = `${key}`;
        try {
            await deleteFileMutation({ variables: { fileKey } });
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    return {
        url,
        presignUrl,
        uploadedFile,
        setUploadedFile,
        uploadRef,
        handleFileChange,
        getPresignedUrl,
        onSubmitFile,
        deleteFile,
    };
};
