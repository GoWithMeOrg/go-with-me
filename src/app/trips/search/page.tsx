import { NextPage } from "next";

import SearchEvent from "@/components/widgets/SearchEvent/SearchEvent";
import SearchEventsList from "@/components/widgets/SearchEventsList/SearchEventsList";

const SearchPage: NextPage<{ searchParams: { text: string; tripId: string } }> = ({ searchParams }) => {
    return (
        <div className="EventListPage">
            <SearchEvent />
            <SearchEventsList text={searchParams.text} tripId={searchParams.tripId} />
        </div>
    );
};

export default SearchPage;
