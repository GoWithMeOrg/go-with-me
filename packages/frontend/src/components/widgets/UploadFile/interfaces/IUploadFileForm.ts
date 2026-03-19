import { Maybe } from '@/app/graphql/types';

import { StorageFolder, UploadFileSizes } from '../types/storage-folder';

export interface IUploadFileForm {
    onImageUrl?: (onSubmitFile: (file: File, preUrl: string) => void) => void;
    width?: number;
    height?: number;
    imageUrl?: Maybe<string>;
    onChange?: (...event: any[]) => void;
    onUploadedFile?: (
        file: File,
        presignedUrl: string,
        submit: () => Promise<void>,
        deleteFile: (url: string) => Promise<void>
    ) => void;
    sizeType?: UploadFileSizes;
    className?: string;
    entityId: string;
    folder: StorageFolder;
}
