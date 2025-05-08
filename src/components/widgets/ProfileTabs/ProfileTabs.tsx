"use client";

import { useState } from "react";
import Link from "next/link";

import { Navbar } from "@/components/widgets/Navbar";
import { NavbarTabs } from "@/components/widgets/Navbar/models";
import { ProfileForm } from "@/components/widgets/ProfileForm";
import { Notifications } from "@/components/widgets/Notifications";

import classes from "./ProfileTabs.module.css";
import { Companions } from "../Companions/Companions";
import { ButtonLink } from "@/components/shared/ButtonLink";

export const ProfileTabs = () => {
    const [activeTab, setActiveTab] = useState(NavbarTabs.PERSONAL);

    const handleTabClick = (tab: NavbarTabs) => {
        setActiveTab(tab);
    };

    return (
        <div className={classes.profile}>
            <div className={classes.list}>
                <Navbar onTabClick={handleTabClick} activeTab={activeTab} />

                <div className={classes.buttonsCreate}>
                    <ButtonLink href={"/events/new"} text={"Create event"} width={"100%"} />
                    <ButtonLink href={"/trips/new"} text={"Create trip"} width={"100%"} />
                </div>
            </div>
            {activeTab === NavbarTabs.PERSONAL && <ProfileForm />}
            {activeTab === NavbarTabs.NOTIFICATIONS && <Notifications />}
            {activeTab === NavbarTabs.COMPANIONS && <Companions />}
        </div>
    );
};

export default ProfileTabs;
