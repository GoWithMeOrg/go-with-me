import SearchEvent from "./SearchEvent";
import EventsList from "./EventsList";

const SearchPage = ({
    searchParams,
}: {
    searchParams?: {
        text?: string;
    };
}) => {
    const text = searchParams?.text || "";

    return (
        <div className="EventListPage">
            <h1>Search Page</h1>
            <SearchEvent />
            <EventsList text={text} />
        </div>
    );
};

export default SearchPage;
