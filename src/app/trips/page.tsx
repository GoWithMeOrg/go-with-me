import type { NextPage } from "next";
import Link from "next/link";

import { TripList } from "@/components/TripList";
import classes from "@/app/trips/Trips.module.css";

const TripListPage: NextPage = async () => {
    return (
        <div className={classes.container}>
            <h1>Trip List Page</h1>
            <div>
                <Link href="/trips/new">Create New Trip</Link>
            </div>
            <TripList />
        </div>
    );
};

export default TripListPage;
