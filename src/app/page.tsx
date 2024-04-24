"use client";
import classes from "./page.module.css";
import { PopularEventList } from "@/components/PopularEventsList/PopularEventsList";

export default function HomePage() {
    return (
        <main className="container">
            <PopularEventList />
        </main>
    );
}
