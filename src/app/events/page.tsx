import type { NextPage } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import cookieName from "@/options/sessionCookieName";
import type { IEvent } from "@/database/models/Event";
import { EventList } from "@/components/EventList/EventList";
import classes from "@/app/events/Events.module.css";

async function getData(sessionId?: string): Promise<{ data: IEvent[] }> {
    const response = await fetch(`${process.env.BASE_FETCH_URL}/api/events`, {
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
            Cookie: `${cookieName}=${sessionId}`,
        },
    });

    if (!response.ok) {
        switch (response.status) {
            case 401:
                redirect("/login");
                break;
            case 403:
                redirect("/login");
                break;
            default:
                throw new Error("Failed to fetch data");
        }
    }

    return response.json();
}

const EventListPage: NextPage = async () => {
    const cookieStore = cookies();
    // Server side pages don't have access to the browser's cookies
    const sessionCookie = cookieStore.get(cookieName);

    const response = await getData(sessionCookie?.value);
    return (
        <div className={classes.container}>
            <h1>Event List Page</h1>
            <div>
                <Link href="/events/new">Create New Event</Link>
            </div>
            <EventList events={response.data} />
        </div>
    );
};

export default EventListPage;
