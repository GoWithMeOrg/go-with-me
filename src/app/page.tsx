"use client";

import { EventListHome } from "@/components/shared/EvenListHome";
import { Promo } from "@/components/shared/Promo";
import { EventList } from "@/components/widgets/EventList";
import { PopularEventList } from "@/components/widgets/PopularEventsList/PopularEventsList";
import { SizeCard } from "@/components/widgets/CardEvent/CardEvent";

import classes from "./page.module.css";
import { MoreLink } from "@/components/shared/MoreLink";

export default function HomePage() {
    return (
        <div className={classes.homePage}>
            <Promo />
            <EventListHome sizeCard={SizeCard.ML} />
        </div>
    );
    //return <PopularEventList />;
}
