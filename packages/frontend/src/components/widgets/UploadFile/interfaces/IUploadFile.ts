import { StorageFolder } from '../types/storage-folder';

export interface IUploadFile {
    onChange?: (url: string) => void;
    folder?: StorageFolder;
    entityId?: string;
}
