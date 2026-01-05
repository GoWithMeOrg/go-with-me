'use client';

import { useEffect, useMemo } from 'react';
import { Label } from '@/components/shared/Label';
import { useUploadFile } from '@/components/widgets/UploadFile/hooks/useUploadFile';
import Image from 'next/image';

import { IUploadFileForm } from './interfaces/IUploadFileForm';
import { UploadFileSizes } from './types/storage-folder';

import classes from './UploadFile.module.css';

export const UploadFile: React.FC<IUploadFileForm> = ({
    width,
    height,
    imageUrl,
    onChange,
    onUploadedFile,
    sizeType,
    className,
    entityId,
    folder,
}) => {
    const { uploadedFile, uploadRef, handleFileChange, onSubmitFile, presignUrl } = useUploadFile({
        onChange: onChange,
        folder: folder,
        entityId: entityId,
    });

    // Передаем данные наверх, когда файл выбран и ссылка получена
    useEffect(() => {
        if (uploadedFile && presignUrl) {
            onUploadedFile?.(uploadedFile, presignUrl, onSubmitFile);
        }
    }, [uploadedFile, presignUrl, onSubmitFile, onUploadedFile]);

    const uploadFileCssString = useMemo(
        () =>
            [
                sizeType === UploadFileSizes.event && classes.event,
                sizeType === UploadFileSizes.profile && classes.profile,
                className,
            ]
                .filter(Boolean)
                .join(' '),
        [className, sizeType]
    );

    return (
        <div className={uploadFileCssString}>
            {!imageUrl && !uploadedFile && <div className={classes.previewBackground} />}

            <div className={classes.previewImage}>
                {imageUrl && !uploadedFile && (
                    <Image
                        className={classes.image}
                        src={imageUrl}
                        width={width}
                        height={height}
                        alt="preview"
                        priority
                    />
                )}
                {uploadedFile && (
                    <Image
                        className={classes.image}
                        src={URL.createObjectURL(uploadedFile)}
                        width={width}
                        height={height}
                        alt="new upload"
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                            borderRadius: '0.25rem',
                        }}
                    />
                )}
            </div>

            <Label label="Загрузить фото" htmlFor="fileInput" className={classes.customFileInput}>
                <input
                    type="file"
                    ref={uploadRef}
                    id="fileInput"
                    className={classes.customFile}
                    onChange={handleFileChange}
                    accept="image/*"
                />
            </Label>
        </div>
    );
};

export default UploadFile;
