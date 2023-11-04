import type { IEvent } from "@/database/models/Event";
import Link from "next/link";

async function getData(): Promise<{ data: IEvent[] }> {
    const response = await fetch(`${process.env.BASE_FETCH_URL}/api/events`, {
        cache: "no-cache",
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    //console.log("response: ", response.status); // eslint-disable-line

    if (!response.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return response.json();
}

export default async function EventListPage() {
    const response = await getData();
    return (
        <div>
            <h1>Event List Page</h1>
            <ul>
                {response.data.map((event) => (
                    <li key={event.id}>
                        <Link href={`/events/${event._id}`}>{event.tripName}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
