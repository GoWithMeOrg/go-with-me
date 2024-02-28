import SearchEvent from "./SearchEvent";
import EventsList from "./EventsList";

const SearchPage = ({
    searchParams,
}: {
    searchParams?: {
        query?: string;
    };
}) => {
    const query = searchParams?.query || "";
    console.log(query);
    return (
        <div className="EventListPage">
            <h1>Search Page</h1>
            <SearchEvent />
            <EventsList query={query} />
        </div>
    );
};

export default SearchPage;
