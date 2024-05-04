import React, { useState } from "react";
import classes from "./UploadFile.module.css";

interface UploadFileProps {
    onImageChange: (selectedImage: any) => void;
}

export const UploadFile: React.FC<UploadFileProps> = ({ onImageChange }) => {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileChange = (event: any) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        // Check if the selected file is an image
        const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!validImageTypes.includes(selectedFile.type)) {
            console.error("Invalid file type. Please select an image.");
            return;
        }

        // Create a new URL object to display the image preview
        const reader: any = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(selectedFile);

        //onImageChange(selectedFile); //метаданные изображения

        onImageChange(previewUrl);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        // Replace '/api/upload' with your file upload endpoint
        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        // Handle the response from the server
        if (response.ok) {
            console.log("File uploaded successfully");
        } else {
            console.error("File upload failed");
        }
    };

    return (
        <div className={classes.uploadFile} onSubmit={handleSubmit} onChange={handleFileChange}>
            {previewUrl && <img src={previewUrl} alt="img" className={classes.preview} />}
            <input type="file" onChange={handleFileChange} />
        </div>
    );
};

export default UploadFile;
