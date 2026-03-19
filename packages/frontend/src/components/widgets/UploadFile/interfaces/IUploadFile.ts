import { StorageFolder } from '../types/storage-folder';

export interface IUploadFile {
    onChange?: (...event: any[]) => void;
    onUploadedFile?: (
        file: File,
        presignedUrl: string,
        submit: () => Promise<void>,
        deleteFile: (url: string) => Promise<void>
    ) => void;

    folder: StorageFolder;
    entityId: string;
}
