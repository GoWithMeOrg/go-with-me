import type { NextPage } from "next";
import Link from "next/link";
import { EventList } from "@/components/EventList/EventList";

const EventListPage: NextPage = async () => {
    return (
        <div className="EventListPage">
            <h1>Event List Page</h1>
            <div>
                <Link href="/events/new">Create New Event</Link>
            </div>
            <EventList />
        </div>
    );
};

export default EventListPage;
