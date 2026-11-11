import { useCallback, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';

import { TOGGLE_LIKE_MUTATION } from '@/app/graphql/mutations/like';
import { GET_LIKES_COUNT, IS_LIKED_BY_USER } from '@/app/graphql/queries/like';
import { LikeProps } from '@/components/widgets/Like/interfaces/LikeProps';

type LikeOverride = {
    isLiked: boolean;
    likesCount: number;
};

const useLike = ({ owner_id, ownerType, initialIsLiked, initialLikesCount }: LikeProps) => {
    const hasInitialData = initialIsLiked !== undefined && initialLikesCount !== undefined;

    // Локальное значение после клика пользователя перекрывает данные с сервера
    const [override, setOverride] = useState<LikeOverride | null>(null);

    const { data: isLikedData } = useQuery<{ isLikedByUser: boolean }>(IS_LIKED_BY_USER, {
        variables: { ownerId: owner_id },
        skip: hasInitialData,
    });

    const { data: likesCountData } = useQuery<{ getLikesCount: number }>(GET_LIKES_COUNT, {
        variables: { ownerId: owner_id },
        skip: hasInitialData,
    });

    const isReady = hasInitialData || (isLikedData !== undefined && likesCountData !== undefined);

    const isLiked =
        override?.isLiked ?? (hasInitialData ? !!initialIsLiked : !!isLikedData?.isLikedByUser);
    const likesCount =
        override?.likesCount ??
        (hasInitialData ? (initialLikesCount ?? 0) : (likesCountData?.getLikesCount ?? 0));

    const [toggleLike] = useMutation(TOGGLE_LIKE_MUTATION, {
        refetchQueries: hasInitialData
            ? undefined
            : [{ query: GET_LIKES_COUNT, variables: { ownerId: owner_id } }],
    });

    const handleLike = useCallback(async () => {
        if (!isReady) return;

        const prevIsLiked = isLiked;
        const prevLikesCount = likesCount;

        setOverride({
            isLiked: !prevIsLiked,
            likesCount: prevLikesCount + (prevIsLiked ? -1 : 1),
        });

        try {
            await toggleLike({
                variables: { ownerId: owner_id, ownerType },
                awaitRefetchQueries: !hasInitialData,
            });
        } catch {
            setOverride({ isLiked: prevIsLiked, likesCount: prevLikesCount });
        }
    }, [isReady, isLiked, likesCount, toggleLike, owner_id, ownerType, hasInitialData]);

    return { handleLike, isLiked, likesCount };
};

export default useLike;
