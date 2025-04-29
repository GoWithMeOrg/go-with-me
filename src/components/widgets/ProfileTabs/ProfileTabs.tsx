"use client";

import { useState } from "react";
import Link from "next/link";

import { Navbar } from "@/components/widgets/Navbar";
import { NavbarTabs } from "@/components/widgets/Navbar/models";
import { ProfileForm } from "@/components/widgets/ProfileForm";
import { NotificationsList } from "@/components/widgets/NotificationsList";

import classes from "./ProfileTabs.module.css";
import { Companions } from "../Companions/Companions";

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
                    <Link className={classes.buttonCreateLink} href="/events/new">
                        Create event
                    </Link>

                    <Link className={classes.buttonCreateLink} href="/trips/new">
                        Create trip
                    </Link>
                </div>
            </div>
            {activeTab === NavbarTabs.PERSONAL && <ProfileForm />}
            {activeTab === NavbarTabs.NOTIFICATIONS && <NotificationsList />}
            {activeTab === NavbarTabs.COMPANIONS && <Companions />}
            {/* {activeTab === "events" && <ProfileForm />}
            {activeTab === "trips" && <ProfileForm />}
            {activeTab === "companions" && <ProfileForm />}
            {activeTab === "chat" && <ProfileForm />}
            {activeTab === "confidentiality" && <ProfileForm />} */}
        </div>
    );
};

export default ProfileTabs;
