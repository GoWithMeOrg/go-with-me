"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export const SearchEvent = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

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
            <label htmlFor="search" className="search">
                search
            </label>

            <input
                className="search"
                placeholder="search"
                defaultValue={searchParams.get("text")?.toString()}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
            />
        </div>
    );
};

export default SearchEvent;
