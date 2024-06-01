"use client";
import { FormEvent, useRef, useState } from "react";
import Image from "next/image";
import classes from "./UploadFile.module.css";

interface UploadFileProps {
    onImageUrl: (selectedImageUrl: string) => void;
    imageUrl?: string;
}

// привязать отправку фото к основной форме.
export const UploadFile: React.FC<UploadFileProps> = ({ onImageUrl, imageUrl }) => {
    const uploadRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [url, setUrl] = useState<string | null>(imageUrl ?? null);

    const handleFileChange = (event: any) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        // onImageChange(file);

        const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!validImageTypes.includes(selectedFile.type)) {
            console.error("Invalid file type. Please select an image.");
            return;
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
            onImageUrl(data.url);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={classes.uploadFile}>
            <div className={classes.preview}>
                <div className={classes.previewImage}>
                    {file && <Image src={url ?? URL.createObjectURL(file)} width={460} height={324} alt="img" />}
                </div>
                {/* {file && <Image src={imageUrl ?? URL.createObjectURL(file)} width={460} height={324} alt="img" />} */}
            </div>

            <form onSubmit={handleSubmit} className={classes.customFileInput}>
                <input
                    type="file"
                    ref={uploadRef}
                    id="fileInput"
                    className={classes.customFile}
                    onChange={handleFileChange}
                />
                <label htmlFor="fileInput">Upload photo</label>
                <button className={classes.sendFile} type="submit">
                    Send
                </button>
            </form>
        </div>
    );
};

export default UploadFile;
