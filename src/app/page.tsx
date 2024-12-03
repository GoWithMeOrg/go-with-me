"use client";

import { EventListHome } from "@/components/widgets/EvenListHome";
import { Promo } from "@/components/shared/Promo";
import { SizeCard } from "@/components/widgets/CardEvent/CardEvent";

import { HowITWorks } from "@/components/shared/HowITWorks";
import { CreateAndInvite } from "@/components/widgets/CreateAndInvite";
import { Mode } from "@/components/widgets/CreateAndInvite/CreateAndInvite";

import classes from "./page.module.css";
import { useSession } from "next-auth/react";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

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
                    <EventListHome sizeCard={SizeCard.ML} />
                    <HowITWorks />
                    <CreateAndInvite mode={Mode.BOTH} status={status} />
                </>
            )}
        </div>
    );
}
