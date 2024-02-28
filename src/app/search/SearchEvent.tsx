"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export const SearchEvent = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = (searchTerm: string) => {
        const params = new URLSearchParams(searchParams);
        if (searchTerm) {
            params.set("query", searchTerm);
        } else {
            params.delete("query");
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
                defaultValue={searchParams.get("query")?.toString()}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
            />
        </div>
    );
};

export default SearchEvent;
