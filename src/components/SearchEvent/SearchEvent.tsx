"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

interface ISearchEventProps {
    className: string;
    placeholder?: string;
    icon?: React.ReactNode;
}

export const SearchEvent = ({ className, placeholder, icon }: ISearchEventProps) => {
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
        <div className="SearchEvent">
            {/* <label htmlFor="search" className="search">
                search
            </label> */}

            <input
                type="search"
                className={className}
                defaultValue={searchParams.get("text")?.toString()}
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
            />
        </div>
    );
};

export default SearchEvent;
