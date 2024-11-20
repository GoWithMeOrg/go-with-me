"use client";

import { EventListHome } from "@/components/shared/EvenListHome";
import { Promo } from "@/components/shared/Promo";
import { SizeCard } from "@/components/widgets/CardEvent/CardEvent";

import { HowITWorks } from "@/components/shared/HowITWorks";
import { CreateAndInvite } from "@/components/widgets/CreateAndInvite";
import { Mode } from "@/components/widgets/CreateAndInvite/CreateAndInvite";

import classes from "./page.module.css";

export default function HomePage() {
    return (
        <div className={classes.homePage}>
            <Promo />
            <EventListHome sizeCard={SizeCard.ML} />
            <HowITWorks />
            <CreateAndInvite mode={Mode.BOTH} />
        </div>
    );
}
