import { useState } from 'react';
import { COMPANION_REQUEST_MUTATION } from '@/app/graphql/mutations/companionRequest';
import { REMOVE_COMPANION_MUTATION } from '@/app/graphql/mutations/companions';
import { GET_COMPANIONS, GET_FIND_COMPANION } from '@/app/graphql/queries/companions';
import { useUserID } from '@/hooks/useUserID';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client/react';

export const useCompanionSearch = () => {
  const [searchValueCompanion, setSearchValueCompanion] = useState('');
  const defaulShowCompanions = 12;
  const [limit, setLimit] = useState<number>(defaulShowCompanions);

  const [loadCompanion, { data: findCompanion, called: findCompanionCalled }] =
    useLazyQuery(GET_FIND_COMPANION);
  const { user_id } = useUserID();

  const {
    loading: loadingCompanions,
    error: errorCompanions,
    data: dataCompanions,
    refetch: refetchCompanions,
  } = useQuery(GET_COMPANIONS, {
    variables: { userId: user_id, limit },
  });

  const [CompanionRequest] = useMutation(COMPANION_REQUEST_MUTATION);
  const [RemoveCompanion] = useMutation(REMOVE_COMPANION_MUTATION);

  const handleFindCompanion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchValueCompanion(inputValue);
    const isEmail = inputValue.includes('@');
    const variables = {
      userId: user_id,
      ...(isEmail ? { email: inputValue } : { name: inputValue }),
    };
    loadCompanion({ variables });
  };

  const clearInputCompanion = () => setSearchValueCompanion('');
  const companions = searchValueCompanion
    ? findCompanion?.findCompanion
    : dataCompanions?.companions?.companions;
  const totalCompanions = dataCompanions?.companions?.totalCompanions;

  const companionRequest = async (id: string) => {
    try {
      await CompanionRequest({
        variables: { senderId: user_id, receiverId: id },
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
    searchValueCompanion,
    setSearchValueCompanion,
    handleFindCompanion,
    clearInputCompanion,
    companions,
    totalCompanions,
    companionRequest,
    removeCompanion,
    refetchCompanions,
    loadingCompanions,
    errorCompanions,
    findCompanionCalled,
    user_id,
    defaulShowCompanions,
    limit,
    setLimit,
    showAllCompanions,
  };
};
