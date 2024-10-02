import { ChangeEvent, useEffect, useRef, useState } from "react";

import { validImageTypes } from "@/constants/constants";

interface IUploadFile {
    onChange?: (...event: any[]) => void;
}
export const useUploadFile = ({ onChange }: IUploadFile) => {
    const uploadRef = useRef<HTMLInputElement>(null);
    const [url, setUrl] = useState<string | null>(null);
    const [presignUrl, setPresignUrl] = useState<string | null>(null);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    //отслеживаем и возвращаем url
    useEffect(() => {
        if (url !== null) {
            onChange?.(url);
        }
    }, [onChange, url]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const file = event.target.files[0];

        validImageTypes;

        if (!validImageTypes.includes(file.type)) {
            console.error("Invalid file type. Please select an image.");
            return;
        } else {
            setUploadedFile(file);
            getPresignedUrl(file);
        }
    };

    //Получаем предварительную ссылку для файла до загрузки его в бд
    const getPresignedUrl = async (uploadedFile: File) => {
        const formData = new FormData();
        formData.append("file", uploadedFile);

        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        const dataUrl = await response.json();

        setPresignUrl(dataUrl.presignUrl); // предварительная ссылка для записи файла в бд
        setUrl(dataUrl.fileUrl); // публичная ссылка по которой можно достать файл
    };

    //Отправляем файл в бд по ранее полученной ссылке
    const onSubmitFile = async (uploadedFile: File, preUrl: string) => {
        if (!uploadedFile && !preUrl) return;
        const response = await fetch(preUrl, {
            method: "PUT",
            body: uploadedFile,
            headers: {
                "x-amz-acl": "public-read",
            },
        });
        if (!response.ok) {
            throw new Error("Error saving file");
        }
    };

    const getDeleteFile = async (fileUrl: string) => {
        const fileName = fileUrl.split("/").pop();
        const response = await fetch("/api/upload", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ fileName }),
        });

        const dataUrl = await response.json();
        console.log(dataUrl);
    };

    return {
        url,
        presignUrl,
        uploadedFile,
        setUploadedFile,
        uploadRef,
        handleFileChange,
        getPresignedUrl,
        onSubmitFile,
        getDeleteFile,
    };
};
