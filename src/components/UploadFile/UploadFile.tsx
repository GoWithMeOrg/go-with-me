"use client";
import { forwardRef, useRef, useState } from "react";
import Image from "next/image";
import classes from "./UploadFile.module.css";

interface IUploadFile {
    //onImageUrl?: (selectedImageUrl: string) => void;
    onChange?: (e: string) => void;
    imageUrl?: string;
    width?: number;
    height?: number;
    className: string;
}

export const UploadFile = forwardRef(function UploadFile(props: IUploadFile, ref) {
    const uploadRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [url, setUrl] = useState<string>(props.imageUrl || "");

    const handleFileChange = (event: any) => {
        setFile(event.target.files[0]);

        const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!validImageTypes.includes(event.target.files[0].type)) {
            console.error("Invalid file type. Please select an image.");
            return;
        }

        onSubmitFile(event.target.files[0]);
    };

    const onSubmitFile = async (file: File) => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Error uploading file");
            }

            const data = await response.json();
            setUrl(data.url);

            if (props.onChange) {
                props.onChange(data.url);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={classes.uploadFile}>
            <div className={props.className}>
                <div className={classes.previewImage}>
                    {url && !file && <Image src={url} width={props.width} height={props.height} alt="img" priority />}
                    {file && (
                        <Image src={URL.createObjectURL(file)} width={props.width} height={props.height} alt="img" />
                    )}
                </div>
            </div>

            <div className={classes.customFileInput}>
                <input
                    type="file"
                    ref={uploadRef}
                    id="fileInput"
                    className={classes.customFile}
                    onChange={handleFileChange}
                />
                <label htmlFor="fileInput">Upload photo</label>
            </div>
        </div>
    );
});

export default UploadFile;
