import { FC } from "react";

import { Dropdown } from "@/components/shared/Dropdown";
import { Label } from "@/components/shared/Label";
import { Badges } from "@/components/shared/Badges";
import { useSelectItems } from "./hooks/useSelectItems";

import Minus from "@/assets/icons/minus.svg";

import classes from "./SelectItems.module.css";
export interface ISelectItems {
    categoryList: string[];
    titleCategories: string;
    eventCategories?: string[];
    onChange: (value: string[]) => void;
    badgesShow?: boolean;
    width?: string;
    filter: boolean;
}

export const SelectItems: FC<ISelectItems> = ({
    categoryList,
    titleCategories,
    eventCategories,
    badgesShow,
    onChange,
    width,
    filter,
}) => {
    const { items, handleItemChange } = useSelectItems({ onChange });

    return (
        <div className={classes.selectedCategoriesLabel} style={{ width: width }}>
            <Label className={classes.selectedCategoriesTitle} label={titleCategories} />

            <Dropdown
                label={"Не выбрано"}
                categoriesData={eventCategories || []}
                onSelectedCategories={handleItemChange}
                list={categoryList}
                filter={filter}
            />

            {badgesShow && (
                <Badges
                    badges={items}
                    icon={<Minus style={{ marginLeft: "0.5rem", cursor: "pointer" }} />}
                    onDeleteBadge={handleItemChange}
                />
            )}
        </div>
    );
};

export default SelectItems;
