import { useState } from 'react';

interface UseImageCoverParams {
    image?: string;
}

export const useImageCover = ({ image }: UseImageCoverParams) => {
    const [imgError, setImgError] = useState(false);
    const showImage = image && !imgError;

    return { showImage, setImgError };
};
