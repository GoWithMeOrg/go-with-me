import { TripList } from '@/components/widgets/TripList';
import { NextPage } from 'next';
import Link from 'next/link';

const TripListPage: NextPage = () => {
  return (
    <div className="TripListPage">
      <h1>Trip List Page</h1>
      <div>
        <Link href="/trips/new">Create New Trip</Link>
      </div>
      <TripList />
    </div>
  );
};

export default TripListPage;
