"use client";

import type { NextPage } from "next";

import { Title } from "@/components/shared/Title";
import { Slider } from "@/components/shared/Slider";
import { FilteredEventsMap } from "@/components/widgets/FilteredEventsMap";

import { CreateAndInvite } from "@/components/widgets/CreateAndInvite";
import { useSession } from "next-auth/react";
import { Mode } from "@/components/widgets/CreateAndInvite/CreateAndInvite";

import classes from "./page.module.css";

const EventListPage: NextPage = () => {
    const { status } = useSession();
    //TODO: реализовать поиск внутри 4-х угольника

    //TODO: добавить индекс поиска в mongoDB - db.events.createIndex({ location: "2dsphere" });
    return (
        <div className={classes.eventListPage}>
            <Title tag={"h1"} title="Join the adventure" className={classes.title} />
            <Slider />
            <FilteredEventsMap />
            <CreateAndInvite mode={Mode.EVENT} status={status} />
        </div>
    );
};

export default EventListPage;
