// import { ChangeEvent, useEffect, useRef, useState } from 'react';
// import { validImageTypes } from '@/constants/constants';

// interface IUploadFile {
//     onChange?: (...event: any[]) => void;
// }
// export const useUploadFile = ({ onChange }: IUploadFile) => {
//     const uploadRef = useRef<HTMLInputElement>(null);
//     const [url, setUrl] = useState<string | null>(null);
//     const [presignUrl, setPresignUrl] = useState<string | null>(null);
//     const [uploadedFile, setUploadedFile] = useState<File | null>(null);

//     //отслеживаем и возвращаем url
//     useEffect(() => {
//         if (url !== null) {
//             onChange?.(url);
//         }
//     }, [onChange, url]);

//     const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//         if (!event.target.files) return;
//         const file = event.target.files[0];

//         if (!validImageTypes.includes(file.type)) {
//             console.error('Invalid file type. Please select an image.');
//             return;
//         } else {
//             setUploadedFile(file);
//             getPresignedUrl(file);
//         }
//     };

//     //Получаем предварительную ссылку для файла до загрузки его в бд
//     const getPresignedUrl = async (uploadedFile: File) => {
//         const formData = new FormData();
//         formData.append('file', uploadedFile);

//         const response = await fetch('/api/upload', {
//             method: 'POST',
//             body: formData,
//         });

//         const dataUrl = await response.json();

//         setPresignUrl(dataUrl.presignUrl); // предварительная ссылка для записи файла в бд
//         setUrl(dataUrl.fileUrl); // публичная ссылка по которой можно достать файл
//     };

//     //Отправляем файл в бд по ранее полученной ссылке
//     const onSubmitFile = async (uploadedFile: File, preUrl: string) => {
//         if (!uploadedFile && !preUrl) return;
//         const response = await fetch(preUrl, {
//             method: 'PUT',
//             body: uploadedFile,
//             headers: {
//                 'x-amz-acl': 'public-read',
//             },
//         });
//         if (!response.ok) {
//             throw new Error('Error saving file');
//         }
//     };

//     const getDeleteFile = async (fileUrl: string) => {
//         const fileName = fileUrl.split('/').pop();
//         const response = await fetch('/api/upload', {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ fileName }),
//         });

//         const dataUrl = await response.json();
//         console.log(dataUrl);
//     };

//     return {
//         url,
//         presignUrl,
//         uploadedFile,
//         setUploadedFile,
//         uploadRef,
//         handleFileChange,
//         getPresignedUrl,
//         onSubmitFile,
//         getDeleteFile,
//     };
// };

import { useRef, useState } from 'react';
import { GET_PRESIGNED_URL } from '@/app/graphql/mutations/upload';
import { useSessionGQL } from '@/app/providers/session/hooks/useSesssionGQL';
import { Session } from '@/app/providers/session/types/session.types';
import { validImageTypes } from '@/constants/constants';
import { useMutation } from '@apollo/client/react';

interface GetPresignedUrlData {
    getPresignedUrl: {
        presignedUrl: string;
        publicUrl: string;
    };
}
interface IUploadFile {
    onChange?: (url: string) => void;
}

export const useUploadFile = ({ onChange }: IUploadFile) => {
    const { data: session } = useSessionGQL();

    const user_id = session?._id;
    console.log(user_id);
    const uploadRef = useRef<HTMLInputElement>(null);
    const [url, setUrl] = useState<string | null>(null);
    const [presignUrl, setPresignUrl] = useState<string | null>(null);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const [getPresignedUrlMutation] = useMutation<GetPresignedUrlData>(GET_PRESIGNED_URL);
    // const [deleteFileMutation] = useMutation(DELETE_FILE_MUTATION);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!validImageTypes.includes(file.type)) {
            console.error('Invalid file type. Please select an image.');
            return;
        } else {
            setUploadedFile(file);
            getPresignedUrl(file);
        }
    };

    const getPresignedUrl = async (uploadedFile: File) => {
        const { data } = await getPresignedUrlMutation({
            variables: {
                userId: user_id,
                input: {
                    fileName: uploadedFile.name,
                    fileType: uploadedFile.type,
                },
            },
        });

        if (data?.getPresignedUrl) {
            const { presignedUrl, publicUrl } = data.getPresignedUrl;

            setPresignUrl(presignedUrl);
            setUrl(publicUrl);
        }
    };

    const onSubmitFile = async (uploadedFile: File, preUrl: string) => {
        if (!uploadedFile && !preUrl) return;
        const response = await fetch(preUrl, {
            method: 'PUT',
            body: uploadedFile,
            headers: {
                'Content-Type': uploadedFile.type, // Обязательно! Должно совпадать с подписью
            },
        });
        if (!response.ok) {
            // Чтобы увидеть реальную причину от S3 в консоли:
            const errorText = await response.text();
            console.error('S3 Error Details:', errorText);
            throw new Error('Error saving file');
        }
    };

    // const deleteFile = async (fileKey: string) => {
    //     try {
    //         await deleteFileMutation({ variables: { fileKey } });
    //         setUrl(null);
    //         onChange?.('');
    //     } catch (err) {
    //         console.error('Delete error:', err);
    //     }
    // };

    return {
        url,
        presignUrl,
        uploadedFile,
        setUploadedFile,
        uploadRef,
        handleFileChange,
        getPresignedUrl,
        onSubmitFile,
        // getDeleteFile,
        // deleteFile,
    };
};
