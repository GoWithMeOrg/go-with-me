import type { NextPage } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import cookieName from "@/options/sessionCookieName";
import type { ITrip } from "@/database/models/Trip";
import { TripList } from "@/components/TripList";

async function getData(sessionId?: string): Promise<{ data: ITrip[] }> {
    const response = await fetch(`${process.env.BASE_FETCH_URL}/api/trips`, {
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

const TripListPage: NextPage = async () => {
    const cookieStore = cookies();
    // Server side pages don't have access to the browser's cookies
    const sessionCookie = cookieStore.get(cookieName);

    const response = await getData(sessionCookie?.value);
    return (
        <div>
            <h1>Trip List Page</h1>
            <div>
                <Link href="/trips/new">Create New Trip</Link>
            </div>
            <TripList trips={response.data} />
        </div>
    );
};

export default TripListPage;
