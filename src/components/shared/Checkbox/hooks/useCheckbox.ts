import { useState } from "react";

interface useCheckboxProps {
    onChange?: (checked: boolean) => void;
}

export const useCheckbox = ({ onChange }: useCheckboxProps) => {
    const [checked, setChecked] = useState<boolean>(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        if (onChange) onChange(event.target.checked);
    };

    return { checked, setChecked, handleInputChange };
};
