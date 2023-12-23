import type { NextPage } from "next";
import Link from "next/link";
import { EventList } from "@/components/EventList/EventList";
import classes from "@/app/events/Events.module.css";

const EventListPage: NextPage = async () => {
    return (
        <div className={classes.container}>
            <h1>Event List Page</h1>
            <div>
                <Link href="/events/new">Create New Event</Link>
            </div>
            <EventList />
        </div>
    );
};

export default EventListPage;
