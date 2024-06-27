"use client";
import { FormEvent, forwardRef, useEffect, useRef, useState } from "react";
import Image from "next/image";
import classes from "./UploadFile.module.css";

interface IUploadFile {
    onImageUrl?: (selectedImageUrl: string) => void;
    imageUrl?: string;
    onChange?: () => void;
    onSubmit?: (...event: any[]) => void;
    onSubmitCalled?: boolean;
}

// привязать отправку фото к основной форме.
// export const UploadFile1 = () => {
//     const uploadRef = useRef<HTMLInputElement>(null);
//     const [file, setFile] = useState<File | null>(null);
//     const [url, setUrl] = useState<string | null>();

//     const handleFileChange = (event: any) => {
//         const selectedFile = event.target.files[0];
//         setFile(selectedFile);

//         const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
//         if (!validImageTypes.includes(selectedFile.type)) {
//             console.error("Invalid file type. Please select an image.");
//             return;
//         }
//     };

//     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         if (!file) return;

//         const formData = new FormData();
//         formData.append("file", file);

//         try {
//             const response = await fetch("/api/upload", {
//                 method: "POST",
//                 body: formData,
//             });

//             if (!response.ok) {
//                 throw new Error("Error uploading file");
//             }

//             const data = await response.json();
//             setUrl(data.url);
//             //onImageUrl(data.url);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <div className={classes.uploadFile}>
//             <div className={classes.preview}>
//                 <div className={classes.previewImage}>
//                     {file && <Image src={url ?? URL.createObjectURL(file)} width={460} height={324} alt="img" />}
//                 </div>
//             </div>

//             <div className={classes.customFileInput}>
//                 <input
//                     type="file"
//                     ref={uploadRef}
//                     id="fileInput"
//                     className={classes.customFile}
//                     onChange={handleFileChange}
//                 />
//                 <label htmlFor="fileInput">Upload photo</label>
//                 {/* <button className={classes.sendFile} type="submit">
//                     Send
//                 </button> */}
//             </div>
//         </div>
//     );
// };

export const UploadFile = forwardRef(function UploadFile(props: IUploadFile, ref) {
    const uploadRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [url, setUrl] = useState<string | null>();

    const handleFileChange = (event: any) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!validImageTypes.includes(selectedFile.type)) {
            console.error("Invalid file type. Please select an image.");
            return;
        }
    };

    // при сохранении (save changes) вызвать onSubmitFile и передать url в контроллер
    // передать вызов функции onSubmit из EventHookForm в UploadFile
    // или передать функцию onSubmitFile onSubmit из EventHookForm

    const onSubmitFile = async (e: FormEvent<HTMLFormElement>) => {
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
            //onImageUrl(data.url);
        } catch (error) {
            console.error(error);
        }
    };

    //если onSubmitCalled = true, то вызвать onSubmitFile
    //console.log(props.onSubmitCalled);

    return (
        <div className={classes.uploadFile}>
            <div className={classes.preview}>
                <div className={classes.previewImage}>
                    {file && <Image src={url ?? URL.createObjectURL(file)} width={460} height={324} alt="img" />}
                </div>
            </div>

            <div className={classes.customFileInput}>
                <input
                    type="file"
                    ref={uploadRef}
                    id="fileInput"
                    className={classes.customFile}
                    onChange={handleFileChange}
                    //onSubmit={handleFileSubmit}
                    //{...props}
                />
                <label htmlFor="fileInput">Upload photo</label>
                {/* <button className={classes.sendFile} type="submit">
                    Send
                </button> */}
            </div>
        </div>
    );
});

export default UploadFile;
