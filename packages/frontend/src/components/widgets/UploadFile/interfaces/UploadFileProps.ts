import { StorageFolder } from '../types/storage-folder';

export interface UploadFileProps {
    onChange?: (...event: any[]) => void;
    onUploadedFile?: (
        submit: () => Promise<void>,
        deleteFile: (url: string) => Promise<void>
    ) => void;

    folder: StorageFolder;
}
