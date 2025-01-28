"use client";

import type { NextPage } from "next";
import { useSession } from "next-auth/react";

import { EventFilters } from "@/components/widgets/EventFilters";
import { CreateAndInvite } from "@/components/widgets/CreateAndInvite";
import { Mode } from "@/components/widgets/CreateAndInvite/CreateAndInvite";

import { Title } from "@/components/shared/Title";
import { Slider } from "@/components/shared/Slider";

import classes from "./page.module.css";

const EventListPage: NextPage = () => {
    const { status } = useSession();

    return (
        <div className={classes.eventListPage}>
            <Title tag={"h1"} title="Join the adventure" className={classes.title} />
            <Slider />
            <EventFilters />
            <CreateAndInvite mode={Mode.EVENT} status={status} />
        </div>
    );
};

export default EventListPage;
