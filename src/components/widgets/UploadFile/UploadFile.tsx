"use client";

import { ChangeEvent, FC, forwardRef, useEffect, useRef, useState } from "react";
import Image from "next/image";

import { Label } from "@/components/shared/Label";

import classes from "./UploadFile.module.css";
import { useUploadFile } from "@/components/widgets/UploadFile/hooks/useUploadFile";

type FlexDirection = "revert-layer" | "column";
interface IUploadFile {
    onImageUrl?: (onSubmitFile: (file: File, preUrl: string) => void) => void;
    width?: number;
    height?: number;
    //onUploadFileChange?: (file: File) => void;
    // imageUrl?: string;
    // onChange?: (e: string) => void;
    onChange?: (...event: any[]) => void;
    onUploadedFile?: (file: File, preUrl: string, onSubmitFile: (file: File, preUrl: string) => void) => void;
}

export const UploadFile = forwardRef(function UploadFile(props: IUploadFile, ref) {
    const { url, uploadedFile, uploadRef, handleFileChange, onSubmitFile, presignUrl } = useUploadFile({
        onChange: props.onChange,
    });

    useEffect(() => {
        if (uploadedFile && presignUrl) {
            props.onUploadedFile?.(uploadedFile, presignUrl, onSubmitFile);
        }
    }, [onSubmitFile, presignUrl, props, uploadedFile]);

    return (
        <div className={classes.uploadFile}>
            {!url && !uploadedFile && <div className={classes.previewBackground}></div>}
            <div className={classes.previewImage}>
                {url && !uploadedFile && (
                    <Image
                        className={classes.image}
                        src={url}
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

            <Label label="Upload photo" htmlFor="fileInput" className={classes.customFileInput}>
                <input
                    type="file"
                    ref={uploadRef}
                    id="fileInput"
                    className={classes.customFile}
                    onChange={handleFileChange}

                    // onImageUrl={onUploadFile}
                />
            </Label>
        </div>
    );
});

export default UploadFile;
