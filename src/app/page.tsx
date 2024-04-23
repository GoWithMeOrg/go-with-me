"use client";

import { PopularEventList } from "@/components/PopularEventsList/PopularEventsList";
import "@/styles/global.css";

export default function HomePage() {
    return (
        <main className="container">
            <PopularEventList />
        </main>
    );
}
