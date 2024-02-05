import { TripList } from "@/components/TripList";
import { NextPage } from "next";
import Link from "next/link";

const TripListPage: NextPage = () => {
    return (
        <div className="EventListPage">
            <h1>Trip List Page</h1>
            <div>
                <Link href="/trips/new">Create New Trip</Link>
            </div>
            <TripList />
        </div>
    );
};

export default TripListPage;
