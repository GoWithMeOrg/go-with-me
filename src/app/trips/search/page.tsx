import SearchEvent from "../../../components/SearchEvent/SearchEvent";
import SearchEventsList from "../../../components/SearchEventsList/SearchEventsList";
import { NextPage } from "next";

const SearchPage: NextPage<{ searchParams: { text: string; tripId: string } }> = ({ searchParams }) => {
    return (
        <div className="EventListPage">
            <SearchEvent />
            <SearchEventsList text={searchParams.text} tripId={searchParams.tripId} />
        </div>
    );
};

export default SearchPage;
