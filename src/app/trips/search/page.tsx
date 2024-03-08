"use client";

import SearchEvent from "./SearchEvent";
import { useSearchParams } from "next/navigation";
import SearchEventsList from "./SearchEventsList";

const SearchPage = ({
    searchParams,
}: {
    searchParams?: {
        text?: string;
    };
}) => {
    const text = searchParams?.text || "";
    // Именно этот учаток кода интересует, сомневаюсь в выборе этого решения
    const [tripId] = useSearchParams().getAll("tripId");

    return (
        <div className="EventListPage">
            <h1>Search Page</h1>
            <SearchEvent />
            <SearchEventsList text={text} tripId={tripId} />
        </div>
    );
};

export default SearchPage;
