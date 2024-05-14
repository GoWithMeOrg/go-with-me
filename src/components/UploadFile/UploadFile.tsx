"use client";
import { FormEvent, useState } from "react";
import Image from "next/image";
import classes from "./UploadFile.module.css";

interface UploadFileProps {
    onImageChange: (selectedImage: any) => void;
    onImageUrl: (selectedImageUrl: string) => void;
    imageUrl?: string;
}

export const UploadFile: React.FC<UploadFileProps> = ({ onImageChange, onImageUrl, imageUrl }) => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: any) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        onImageChange(file);

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
            onImageUrl(data.url);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={classes.uploadFile}>
            <div className={classes.preview}>
                {file && <Image src={imageUrl ?? URL.createObjectURL(file)} width={460} height={324} alt="img" />}
            </div>

            <form onSubmit={handleSubmit} className={classes.customFileInput}>
                <input type="file" id="fileInput" className={classes.customFile} onChange={handleFileChange} />
                <label htmlFor="fileInput">Upload photo</label>
            </form>
        </div>
    );
};

export default UploadFile;
