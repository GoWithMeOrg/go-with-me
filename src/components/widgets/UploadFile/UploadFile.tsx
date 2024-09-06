"use client";

import { FC } from "react";
import Image from "next/image";

import { Label } from "@/components/shared/Label";
import { Input } from "@/components/shared/Input";

import classes from "./UploadFile.module.css";
import useUploadFile from "./hooks/useUploadFile";

type FlexDirection = "revert-layer" | "column";
interface IUploadFile {
    //onImageUrl?: (selectedImageUrl: string) => void;
    width?: number;
    height?: number;
}

export const UploadFile: FC<IUploadFile> = (props) => {
    const { url, file, handleFileChange, uploadRef } = useUploadFile({});

    return (
        <div className={classes.uploadFile}>
            {!url && !file && <div className={classes.previewBackground}></div>}
            <div className={classes.previewImage}>
                {url && !file && (
                    <Image
                        className={classes.image}
                        src={url}
                        width={props.width}
                        height={props.height}
                        alt="img"
                        priority
                    />
                )}
                {file && (
                    <Image
                        className={classes.image}
                        src={URL.createObjectURL(file)}
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
                />
            </Label>
        </div>
    );
};

export default UploadFile;
