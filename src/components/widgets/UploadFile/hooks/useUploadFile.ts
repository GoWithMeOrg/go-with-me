import { useState, useEffect, PropsWithChildren, useRef } from "react";

interface IUseUploadFile extends PropsWithChildren {
    //onImageUrl?: (selectedImageUrl: string) => void;
    onChange?: (e: string) => void;
    imageUrl?: string;
    className?: string;
    //flexDirection?: FlexDirection | undefined;
}
export const useUploadFile = ({ ...props }: IUseUploadFile) => {
    const uploadRef = useRef<HTMLInputElement>(null);
    const [url, setUrl] = useState(props.imageUrl || "");
    const [file, setFile] = useState(null);

    useEffect(() => {
        setUrl(props.imageUrl || "");
    }, [props.imageUrl]);

    // Загружаем файл и получаем ссылку на него до отправки в бд
    // Отправляем файл в бд по ранее полученой ссылке после сохраннения события и записываем ссылку в бд

    const handleFileChange = (event: any) => {
        setFile(event.target.files[0]);

        const validImageTypes = ["image/jpeg", "image/png", "image/gif"];

        if (!validImageTypes.includes(event.target.files[0].type)) {
            console.error("Invalid file type. Please select an image.");
            return;
        }
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

            console.log(data.fileUrl);
            if (props.onChange) {
                props.onChange(data.url);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return { url, file, handleFileChange, onSubmitFile, uploadRef };
};

export default useUploadFile;
