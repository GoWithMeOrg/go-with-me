import { useCallback, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { TOGGLE_LIKE_MUTATION } from '@/app/graphql/mutations/like';
import { GET_LIKES_COUNT, IS_LIKED_BY_USER } from '@/app/graphql/queries/like';
import { LikeProps } from '@/components/widgets/Like/interfaces/LikeProps';

const useLike = ({ owner_id, ownerType, initialIsLiked, initialLikesCount }: LikeProps) => {
    const hasInitialData = initialIsLiked !== undefined && initialLikesCount !== undefined;

    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const isReadyRef = useRef(false);
    const isLikedRef = useRef(false);

    const { data: isLikedData } = useQuery<{ isLikedByUser: boolean }>(IS_LIKED_BY_USER, {
        variables: { ownerId: owner_id },
        skip: hasInitialData,
    });

    const { data: likesCountData } = useQuery<{ getLikesCount: number }>(GET_LIKES_COUNT, {
        variables: { ownerId: owner_id },
        skip: hasInitialData,
    });

    useEffect(() => {
        if (hasInitialData) {
            setIsLiked(initialIsLiked);
            setLikesCount(initialLikesCount);
            isReadyRef.current = true;
        } else if (isLikedData && likesCountData !== undefined) {
            setIsLiked(!!isLikedData.isLikedByUser);
            setLikesCount(likesCountData.getLikesCount);
            isReadyRef.current = true;
        }
    }, [hasInitialData, initialIsLiked, initialLikesCount, isLikedData, likesCountData]);

    isLikedRef.current = isLiked;

    const [toggleLike] = useMutation(TOGGLE_LIKE_MUTATION, {
        refetchQueries: hasInitialData
            ? undefined
            : [{ query: GET_LIKES_COUNT, variables: { ownerId: owner_id } }],
    });

    const handleLike = useCallback(async () => {
        if (!isReadyRef.current) return;

        const prevIsLiked = isLikedRef.current;

        setIsLiked(!prevIsLiked);
        setLikesCount((c) => c + (prevIsLiked ? -1 : 1));

        try {
            await toggleLike({
                variables: { ownerId: owner_id, ownerType },
                awaitRefetchQueries: !hasInitialData,
            });
        } catch {
            setIsLiked(prevIsLiked);
            setLikesCount((c) => (prevIsLiked ? c + 1 : c - 1));
        }
    }, [toggleLike, owner_id, ownerType, hasInitialData]);

    return { handleLike, isLiked, likesCount };
};

export default useLike;
