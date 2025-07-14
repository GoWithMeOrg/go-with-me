import { useState } from "react";

export const useCompanionSelection = () => {
    const [select, setSelect] = useState<boolean>(false);
    const [checkedCompanions, setCheckedCompanions] = useState<Record<string, boolean>>({});

    const selectCompanions = () => setSelect(!select);

    const handleCheckboxChange = (id: string, isChecked: boolean) => {
        setCheckedCompanions((prev) => ({
            ...prev,
            [id]: isChecked,
        }));
    };

    const checkedCompanionsCounter = Object.keys(checkedCompanions).length;
    const clearChecked = () => setCheckedCompanions({});

    return {
        select,
        selectCompanions,
        checkedCompanions,
        setCheckedCompanions,
        handleCheckboxChange,
        checkedCompanionsCounter,
        clearChecked,
    };
};
