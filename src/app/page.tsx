"use client";

import { PopularEventList } from "@/components/PopularEventsList/PopularEventsList";
import classes from "./page.module.css";

export default function HomePage() {
    return (
        <main className={classes.container}>
            <PopularEventList />
        </main>
    );
}
