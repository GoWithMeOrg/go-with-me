import { useState } from "react";

interface useCheckboxProps {
    onChange?: (checked: boolean) => void;
    controlledChecked?: boolean;
}

export const useCheckbox = ({ onChange, controlledChecked }: useCheckboxProps) => {
    const [checked, setChecked] = useState<boolean>(false);

    // Если controlledChecked передан, используем его вместо локального состояния
    const isChecked = controlledChecked !== undefined ? controlledChecked : checked;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (controlledChecked === undefined) {
            setChecked(event.target.checked);
        }
        if (onChange) onChange(event.target.checked);
    };

    return { checked: isChecked, setChecked, handleInputChange };
};
