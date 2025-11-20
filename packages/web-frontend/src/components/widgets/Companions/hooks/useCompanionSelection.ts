import { useState } from 'react';

export const useCompanionSelection = () => {
  const [select, setSelect] = useState<boolean>(false);
  const [checkedCompanions, setCheckedCompanions] = useState<Record<string, boolean>>({});

  const selectCompanions = () => {
    setSelect(!select);
    setCheckedCompanions({});
  };

  // const clearChecked = () => setCheckedCompanions({});

  const handleCheckboxChange = (id: string, isChecked: boolean) => {
    setCheckedCompanions((prev) => ({
      ...prev,
      [id]: isChecked,
    }));
  };

  const checkedCompanionsCounter = Object.keys(checkedCompanions).length;
  const receiverIds = Object.keys(checkedCompanions).filter((id) => checkedCompanions[id] === true);

  return {
    select,
    selectCompanions,
    checkedCompanions,
    setCheckedCompanions,
    handleCheckboxChange,
    checkedCompanionsCounter,
    receiverIds,
  };
};
