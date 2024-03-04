"use client";

import EventsList from "./EventsList";
import SearchEvent from "./SearchEvent";
import { useSearchParams } from "next/navigation";

const SearchPage = ({
    searchParams,
}: {
    searchParams?: {
        text?: string;
    };
}) => {
    const text = searchParams?.text || "";
    const [tripId] = useSearchParams().getAll("tripId");

    return (
        <div className="EventListPage">
            <h1>Search Page</h1>
            <SearchEvent />
            <EventsList text={text} tripId={tripId} />
        </div>
    );
};

export default SearchPage;
