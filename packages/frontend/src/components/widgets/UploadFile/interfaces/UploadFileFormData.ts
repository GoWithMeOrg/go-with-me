import {
    StorageFolder,
    UploadFileSizes,
} from '@/components/widgets/UploadFile/types/storage-folder';
import { Maybe } from '@go-with-me/shared/graphql';

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
