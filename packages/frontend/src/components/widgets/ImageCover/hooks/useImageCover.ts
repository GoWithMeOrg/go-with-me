import { useState } from 'react';

import { IMAGE_SIZES, ImageSizeKey } from '../constants';

interface UseImageCoverParams {
    image?: string;
    size: ImageSizeKey;
}

export const useImageCover = ({ image, size }: UseImageCoverParams) => {
    const [imgError, setImgError] = useState(false);
    const showImage = image && !imgError;
    const dimensions = IMAGE_SIZES[size];

    return { showImage, setImgError, dimensions };
};
