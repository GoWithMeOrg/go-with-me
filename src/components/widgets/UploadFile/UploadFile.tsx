"use client";

import { forwardRef, useEffect, useMemo } from "react";
import Image from "next/image";

import { Label } from "@/components/shared/Label";

import { useUploadFile } from "@/components/widgets/UploadFile/hooks/useUploadFile";

import classes from "./UploadFile.module.css";

interface IUploadFile {
    onImageUrl?: (onSubmitFile: (file: File, preUrl: string) => void) => void;
    width?: number;
    height?: number;
    imageUrl?: string;
    onChange?: (...event: any[]) => void;
    onUploadedFile?: (file: File, preUrl: string, onSubmitFile: (file: File, preUrl: string) => void) => void;
    sizeType?: UploadFileSizes;
    className?: string;
}

export enum UploadFileSizes {
    event = "event",
    profile = "profile",
}

export const UploadFile = forwardRef(function UploadFile(props: IUploadFile, ref) {
    const { uploadedFile, uploadRef, handleFileChange, onSubmitFile, presignUrl } = useUploadFile({
        onChange: props.onChange,
    });

    useEffect(() => {
        if (uploadedFile && presignUrl) {
            props.onUploadedFile?.(uploadedFile, presignUrl, onSubmitFile);
        }
    }, [onSubmitFile, presignUrl, props, uploadedFile]);

    const uploadFileCssString = useMemo(
        () =>
            [
                props.sizeType === "event" && classes.event,
                props.sizeType === "profile" && classes.profile,
                props.className,
            ]
                .filter(Boolean)
                .join(" "),
        [props.className, props.sizeType],
    );

    return (
        <div className={uploadFileCssString}>
            {!props.imageUrl && !uploadedFile && <div className={classes.previewBackground}></div>}
            <div className={classes.previewImage}>
                {props.imageUrl && !uploadedFile && (
                    <Image
                        className={classes.image}
                        src={props.imageUrl}
                        width={props.width}
                        height={props.height}
                        alt="img"
                        priority
                    />
                )}
                {uploadedFile && (
                    <Image
                        className={classes.image}
                        src={URL.createObjectURL(uploadedFile)}
                        width={props.width}
                        height={props.height}
                        alt="img"
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
                />
            </Label>
        </div>
    );
});

export default UploadFile;
