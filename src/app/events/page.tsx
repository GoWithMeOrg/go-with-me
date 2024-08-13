import type { NextPage } from "next";
import Link from "next/link";
import { EventList } from "@/components/widgets/EventList/EventList";
import classes from "./page.module.css";
const EventListPage: NextPage = async () => {
    return (
        <section className={classes.eventListPage}>
            <h1>Event List Page</h1>
            <div>
                <Link href="/events/new">Create New Event</Link>
            </div>
            <EventList />
        </section>
    );
};

export default EventListPage;
