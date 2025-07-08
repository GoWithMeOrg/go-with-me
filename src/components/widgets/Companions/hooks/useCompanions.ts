import { useState } from "react";
import { useSession } from "next-auth/react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";

import { GET_FIND_USERS } from "@/app/api/graphql/queries/findUsers";
import { GET_COMPANIONS, GET_FIND_COMPANION } from "@/app/api/graphql/queries/companions";
import { REMOVE_COMPANION_MUTATION } from "@/app/api/graphql/mutations/companions";
import { COMPANION_REQUEST_MUTATION } from "@/app/api/graphql/mutations/companionRequest";
import { usePopup } from "@/components/shared/Popup/hooks";

export const useCompanions = () => {
    const { data: session } = useSession();
    const { showPopup, handleShowPopup, handleHidePopup, container, popupCss, refPopup } = usePopup({
        popupMode: "map",
    });

    const defaulShowCompanions = 12;
    const [limit, setLimit] = useState<number>(defaulShowCompanions);
    const user_id = session?.user.id;

    const [searchValue, setSearchValue] = useState("");
    const [searchValueCompanion, setSearchValueCompanion] = useState("");
    const [select, setSelect] = useState<boolean>(false);
    const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});

    const [loadUsers, { loading, error, data, called, refetch }] = useLazyQuery(GET_FIND_USERS);
    const [loadCompanion, { data: findCompanion, called: findCompanionCalled }] = useLazyQuery(GET_FIND_COMPANION);

    const {
        loading: errorloading,
        error: errorCompanions,
        data: dataCompanions,
        refetch: refetchCompanions,
    } = useQuery(GET_COMPANIONS, {
        variables: { userId: user_id, limit },
    });

    const findUsers = searchValue ? data?.findUsers || [] : [];
    const companions = searchValueCompanion ? findCompanion?.findCompanion : dataCompanions?.companions?.companions;
    const checkedMapObj = Object.keys(checkedMap).length;
    const totalCompanions = dataCompanions?.companions?.totalCompanions;

    const handleFindUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setSearchValue(inputValue);

        const isEmail = inputValue.includes("@");
        const variables = {
            user_id,
            ...(isEmail ? { email: inputValue } : { name: inputValue }),
        };
        loadUsers({ variables });
    };

    const clearInput = () => {
        setSearchValue("");
    };

    const handleFindCompanion = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setSearchValueCompanion(inputValue);

        const isEmail = inputValue.includes("@");
        const variables = {
            userId: user_id,
            ...(isEmail ? { email: inputValue } : { name: inputValue }),
        };
        loadCompanion({ variables });
    };

    const sendRequestCompanion = (card_id: string) => {
        handleShowPopup();
        companionRequest(card_id);
        refetch();
    };

    const clearInputCompanion = () => {
        setSearchValueCompanion("");
    };

    const [RemoveCompanion] = useMutation(REMOVE_COMPANION_MUTATION);

    const removeCompanion = async (id: string) => {
        console.log(id, user_id);
        try {
            await RemoveCompanion({
                variables: { userId: user_id, companionId: id },
            });
        } catch (error) {
            console.error("Error deleting event: ", error);
        }
        refetchCompanions();
    };

    const [CompanionRequest] = useMutation(COMPANION_REQUEST_MUTATION);

    const companionRequest = async (id: string) => {
        try {
            await CompanionRequest({
                variables: { senderId: user_id, receiverId: id },
            });
        } catch (error) {
            console.error("Error deleting event: ", error);
        }
    };

    const showAllCompanions = () => {
        setLimit(limit === 0 ? 12 : 0);
    };

    const selectCompanions = () => {
        setSelect(!select);
    };

    const handleCheckboxChange = (id: string, isChecked: boolean) => {
        setCheckedMap((prev) => ({
            ...prev,
            [id]: isChecked,
        }));
    };

    const deleteCheckedCards = () => {
        Object.entries(checkedMap).forEach(([id, isChecked]) => {
            if (isChecked) {
                removeCompanion(id);
            }
        });
        setCheckedMap({});
        refetchCompanions();
        handleHidePopup();
    };

    return {
        handleFindUsers,
        handleFindCompanion,
        sendRequestCompanion,
        findUsers,
        companions,
        called,
        removeCompanion,
        companionRequest,
        searchValue,
        searchValueCompanion,
        clearInput,
        clearInputCompanion,
        showAllCompanions,
        select,
        limit,
        selectCompanions,
        handleCheckboxChange,
        deleteCheckedCards,
        showPopup,
        handleShowPopup,
        handleHidePopup,
        container,
        popupCss,
        refPopup,
        checkedMapObj,
        defaulShowCompanions,
        totalCompanions,
    };
};
