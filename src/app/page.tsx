"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Promo } from "@/components/shared/Promo";
import { HowITWorks } from "@/components/shared/HowITWorks";

import { SizeCard } from "@/components/widgets/CardEvent/CardEvent";
import { CreateAndInvite } from "@/components/widgets/CreateAndInvite";
import { Mode } from "@/components/widgets/CreateAndInvite/CreateAndInvite";
import { EventList } from "@/components/widgets/EventList";

import classes from "./page.module.css";
import { Backdrop } from "@/components/widgets/Backdrop";
import { MoreLink } from "@/components/shared/MoreLink";
import { Title } from "@/components/shared/Title";

export default function HomePage() {
    const { data: session, status } = useSession();

    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/events");
        }
    }, [status, router]);

    return (
        <div className={classes.homePage}>
            {status === "unauthenticated" && (
                <>
                    <Promo />
                    <section className={classes.popularEvents}>
                        <div className={classes.popularEventsHeader}>
                            <Title title={"Popular Event List"} tag={"h2"} />
                        </div>

                        <EventList sizeCard={SizeCard.ML} limit={9} offset={9} sort={"startDate"} />

                        <MoreLink link={"/events"} text={"more events"} />
                    </section>
                    <HowITWorks />
                    <CreateAndInvite mode={Mode.BOTH} status={status} />
                </>
            )}
        </div>
    );
}
