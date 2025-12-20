import SearchEvent from '@/components/widgets/SearchEvent/SearchEvent';
import SearchEventsList from '@/components/widgets/SearchEventsList/SearchEventsList';
import { NextPage } from 'next';

const SearchPage: NextPage<{ searchParams: Promise<{ text?: string; tripId?: string }> }> = async ({
    searchParams,
}: {
    searchParams: Promise<{ text?: string; tripId?: string }>;
}) => {
    const { text = '', tripId = '' } = await searchParams;
    return (
        <div className="EventListPage">
            <SearchEvent />
            <SearchEventsList text={text} tripId={tripId} />
        </div>
    );
};

export default SearchPage;

// const SearchPage: NextPage<{ searchParams: { text: string; tripId: string } }> = ({ searchParams }) => {
//     return (
//         <div className="EventListPage">
//             <SearchEvent />
//             <SearchEventsList text={searchParams.text} tripId={searchParams.tripId} />
//         </div>
//     );
// };

// export default SearchPage;
