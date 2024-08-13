"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

import Search from "@/assets/icons/search.svg";

import classes from "./SearchEvent.module.css";

interface ISearchEventProps {
    className?: string;
    placeholder?: string;
}

export const SearchEvent = ({ className, placeholder }: ISearchEventProps) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    //console.log(searchParams);
    const handleSearch = (searchTerm: string) => {
        const params = new URLSearchParams(searchParams);
        if (searchTerm) {
            params.set("text", searchTerm);
        } else {
            params.delete("text");
        }
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className={classes.searchEvent}>
            <input
                type="search"
                className={className}
                defaultValue={searchParams.get("text")?.toString()}
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
            />
            <Search className={classes.searchIcon} />
        </div>
    );
};

export default SearchEvent;
