"use client";

import { EventListHome } from "@/components/shared/EvenListHome";
import { Promo } from "@/components/shared/Promo";
import { EventList } from "@/components/widgets/EventList";
import { PopularEventList } from "@/components/widgets/PopularEventsList/PopularEventsList";

import classes from "./page.module.css";

export default function HomePage() {
    return (
        <div className={classes.homePage}>
            <Promo />
            <EventListHome />
        </div>
    );
    //return <PopularEventList />;
}
