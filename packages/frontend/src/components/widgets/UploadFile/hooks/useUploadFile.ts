import { useCallback, useEffect, useRef, useState } from 'react';
import { DELETE_FILE_MUTATION, GET_PRESIGNED_URL } from '@/app/graphql/mutations/upload';
import { GetPresignedUrlMutation } from '@/app/graphql/types';
import { validImageTypes } from '@/constants/constants';
import { useMutation } from '@apollo/client/react';

import { UploadFileProps } from '../interfaces/UploadFileProps';

export const useUploadFile = ({ onChange, folder, entityId, onUploadedFile }: UploadFileProps) => {
    const uploadRef = useRef<HTMLInputElement>(null);

    const [publicUrl, setPublicUrl] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // внутренние данные без лишних ре-рендеров
    const presignUrlRef = useRef<string | null>(null);
    const uploadedFileRef = useRef<File | null>(null);
    const previewObjectUrlRef = useRef<string | null>(null);

    // освобождаем object URL при размонтировании
    useEffect(() => {
        return () => {
            if (previewObjectUrlRef.current) {
                URL.revokeObjectURL(previewObjectUrlRef.current);
            }
        };
    }, []);

    const [getPresignedUrlMutation] = useMutation<GetPresignedUrlMutation>(GET_PRESIGNED_URL);
    const [deleteFileMutation] = useMutation(DELETE_FILE_MUTATION);

    const getPresignedUrl = async (file: File) => {
        const { data } = await getPresignedUrlMutation({
            variables: {
                input: {
                    fileName: file.name,
                    fileType: file.type,
                },
                entityId,
                folder,
            },
        });

        if (!data?.getPresignedUrl) {
            throw new Error('Failed to get presigned URL');
        }

        return data.getPresignedUrl;
    };

    const deleteFile = async (fileUrl: string) => {
        const key = new URL(fileUrl).pathname.replace(/^\/[^\/]+\//, '');

        try {
            await deleteFileMutation({ variables: { fileKey: key } });

            // очищаем всё состояние
            if (previewObjectUrlRef.current) {
                URL.revokeObjectURL(previewObjectUrlRef.current);
                previewObjectUrlRef.current = null;
            }
            setPublicUrl(null);
            setPreviewUrl(null);
            presignUrlRef.current = null;
            uploadedFileRef.current = null;
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    const submitFile = useCallback(async () => {
        const file = uploadedFileRef.current;
        const preUrl = presignUrlRef.current;

        if (!file || !preUrl) return;

        const response = await fetch(preUrl, {
            method: 'PUT',
            body: file,
            headers: { 'Content-Type': file.type },
        });

        if (!response.ok) {
            throw new Error(`S3 upload failed: ${response.status}`);
        }
    }, []);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!validImageTypes.includes(file.type)) {
            setError('Invalid file type. Please select an image.');
            return;
        }

        setError(null);
        setIsUploading(true);

        try {
            const { presignedUrl, publicUrl: newPublicUrl } = await getPresignedUrl(file);

            // обновляем внутреннее состояние
            presignUrlRef.current = presignedUrl;
            uploadedFileRef.current = file;

            // создаём локальный preview
            if (previewObjectUrlRef.current) {
                URL.revokeObjectURL(previewObjectUrlRef.current);
            }
            const objectUrl = URL.createObjectURL(file);
            previewObjectUrlRef.current = objectUrl;
            setPreviewUrl(objectUrl);

            setPublicUrl(newPublicUrl);
            onChange?.(newPublicUrl);
            console.log('передаём в onUploadedFile:', { submitFile, deleteFile });
            onUploadedFile?.(submitFile, deleteFile);
        } catch (err) {
            setError('Failed to prepare upload');
            console.error(err);
        } finally {
            setIsUploading(false);
        }
    };

    return {
        uploadRef,
        publicUrl,
        previewUrl,
        isUploading,
        error,
        handleFileChange,
        submitFile,
        deleteFile,
    };
};
