'use client';

import { FC } from 'react';
import { Label } from '@/components/shared/Label';
import { useUploadFile } from '@/components/widgets/UploadFile/hooks/useUploadFile';
import { UploadFileFormData } from '@/components/widgets/UploadFile/interfaces/UploadFileFormData';
import { UploadFileSizes } from '@/components/widgets/UploadFile/types/storage-folder';
import Image from 'next/image';

import classes from './UploadFile.module.css';

export const UploadFile: FC<UploadFileFormData> = ({
    width,
    height,
    imageUrl,
    onChange,
    onUploadedFile,
    sizeType,
    className,
    folder,
}) => {
    const { uploadRef, previewUrl, isUploading, error, handleFileChange } = useUploadFile({
        onChange,
        folder,
        onUploadedFile,
    });

    const uploadFileCssString = [
        sizeType === UploadFileSizes.event && classes.event,
        sizeType === UploadFileSizes.profile && classes.profile,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const displayUrl = previewUrl ?? imageUrl ?? null;

    return (
        <div className={uploadFileCssString}>
            {!displayUrl && <div className={classes.previewBackground} />}

            <div className={classes.previewImage}>
                {displayUrl && (
                    <Image
                        className={classes.image}
                        src={displayUrl}
                        width={width}
                        height={height}
                        alt={previewUrl ? 'new upload' : 'preview'}
                        priority={!previewUrl}
                        style={
                            previewUrl
                                ? {
                                      objectFit: 'cover',
                                      objectPosition: 'center',
                                      borderRadius: '0.25rem',
                                  }
                                : undefined
                        }
                    />
                )}
            </div>

            {isUploading && <div className={classes.loadingOverlay}>Загрузка...</div>}
            {error && <p className={classes.error}>{error}</p>}

            <Label label="Загрузить фото" htmlFor="fileInput" className={classes.customFileInput}>
                <input
                    type="file"
                    ref={uploadRef}
                    id="fileInput"
                    className={classes.customFile}
                    onChange={handleFileChange}
                    accept="image/*"
                    disabled={isUploading}
                />
            </Label>
        </div>
    );
};

export default UploadFile;
