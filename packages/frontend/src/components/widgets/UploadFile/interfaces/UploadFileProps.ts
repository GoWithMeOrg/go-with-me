import { StorageFolder } from '../types/storage-folder';

export interface UploadFileProps {
    onChange?: (publicUrl: string) => void;
    onUploadedFile?: (
        submit: () => Promise<void>,
        deleteFile: (url: string) => Promise<void>
    ) => void;

    folder: StorageFolder;
}
