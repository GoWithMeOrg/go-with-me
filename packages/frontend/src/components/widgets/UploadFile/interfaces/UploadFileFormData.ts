import { Maybe } from '@/app/graphql/types';
import {
    StorageFolder,
    UploadFileSizes,
} from '@/components/widgets/UploadFile/types/storage-folder';

export interface UploadFileFormData {
    folder: StorageFolder;

    imageUrl?: Maybe<string>;
    width?: number;
    height?: number;
    sizeType?: UploadFileSizes;
    className?: string;

    onChange?: (publicUrl: string) => void;
    onUploadedFile?: (
        submit: () => Promise<void>,
        deleteFile: (url: string) => Promise<void>
    ) => void;
}
