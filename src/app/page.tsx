"use client";

import { EventListHome } from "@/components/shared/EvenListHome";
import { Promo } from "@/components/shared/Promo";
import { SizeCard } from "@/components/widgets/CardEvent/CardEvent";

import classes from "./page.module.css";
import { HowITWorks } from "@/components/shared/HowITWorks";
import { CreateAndInvite } from "@/components/widgets/CreateAndInvite";

export default function HomePage() {
    return (
        <div className={classes.homePage}>
            <Promo />
            <EventListHome sizeCard={SizeCard.ML} />
            <HowITWorks />
            <CreateAndInvite />
        </div>
    );
    //return <PopularEventList />;
}
