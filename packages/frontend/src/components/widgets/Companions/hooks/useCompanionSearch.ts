import { useState } from 'react';
import { SEND_REQUEST_COMPANION_MUTATION } from '@/app/graphql/mutations/companionRequest';
import { REMOVE_COMPANION_MUTATION } from '@/app/graphql/mutations/companions';
import { GET_COMPANIONS_BY_OWNER_ID, GET_FIND_COMPANION } from '@/app/graphql/queries/companions';
import { CompanionsResponse, QueryCompanionsByOwnerIdArgs } from '@/app/graphql/types';
import { useUserID } from '@/hooks/useUserID';
import { useMutation, useQuery } from '@apollo/client/react';

import { useSearchInput } from '../../SearchInput/hooks/useSearchInput';

export const useCompanionSearch = () => {
    const defaulShowCompanions = 12;
    const [limit, setLimit] = useState<number>(defaulShowCompanions);
    const { user_id } = useUserID();

    const {
        handleSearch: handleSearchCompanion,
        searchData: searchDataCompanion,
        called: calledCompanion,
        clearSearch: clearSearchCompanion,
        loading: loadingCompanion,
        searchValue: searchValueCompanion,
    } = useSearchInput<{ findCompanion: CompanionsResponse }, { query?: string | null }>({
        searchQuery: GET_FIND_COMPANION,
        dataKey: 'findCompanion',
    });

    const {
        loading: loadingCompanions,
        error: errorCompanions,
        data: dataCompanions,
        refetch: refetchCompanions,
    } = useQuery<{ companionsByOwnerId: CompanionsResponse }, QueryCompanionsByOwnerIdArgs>(
        GET_COMPANIONS_BY_OWNER_ID,
        {
            variables: { ownerId: user_id as string, limit, offset: 0 },
        }
    );

    const [CompanionRequest] = useMutation(SEND_REQUEST_COMPANION_MUTATION);
    const [RemoveCompanion] = useMutation(REMOVE_COMPANION_MUTATION);

    const companions =
        searchValueCompanion && searchDataCompanion?.companions?.length > 0
            ? searchDataCompanion.companions
            : dataCompanions?.companionsByOwnerId?.companions;

    console.log(searchDataCompanion);

    const totalCompanions = dataCompanions?.companionsByOwnerId?.totalCompanions;

    const companionRequest = async (id: string) => {
        try {
            await CompanionRequest({
                variables: { sender: user_id, receiver: id },
            });
        } catch (error) {
            console.error('Error sending companion request: ', error);
        }
    };

    const removeCompanion = async (id: string) => {
        try {
            await RemoveCompanion({
                variables: { userId: user_id, companionId: id },
            });
        } catch (error) {
            console.error('Error deleting companion: ', error);
        }
        refetchCompanions();
    };

    // Показать всех компаньонов (лимит)
    const showAllCompanions = () => {
        setLimit(limit === 0 ? defaulShowCompanions : 0);
    };

    return {
        companions,
        totalCompanions,
        companionRequest,
        removeCompanion,
        refetchCompanions,
        loadingCompanions,
        errorCompanions,
        user_id,
        defaulShowCompanions,
        limit,
        setLimit,
        showAllCompanions,

        searchDataCompanion,
        calledCompanion,
        clearSearchCompanion,
        loadingCompanion,
        searchValueCompanion,
        handleSearchCompanion,
    };
};
