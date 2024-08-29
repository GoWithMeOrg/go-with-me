"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/shared/Button";

import { Navbar } from "@/components/widgets/Navbar";
import { ProfileForm } from "@/components/widgets/ProfileForm";
import { NotificationsList } from "@/components/widgets/NotificationsList";

import classes from "./ProfileTabs.module.css";

export const ProfileTabs = () => {
    const [activeTab, setActiveTab] = useState("personal");

    const handleTabClick = (tab: string) => {
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
            {activeTab === "personal" && <ProfileForm userId={""} />}
            {activeTab === "notifications" && <NotificationsList />}
            {/* {activeTab === "events" && <ProfileForm />}
            {activeTab === "trips" && <ProfileForm />}
            {activeTab === "companions" && <ProfileForm />}
            {activeTab === "chat" && <ProfileForm />}
            {activeTab === "confidentiality" && <ProfileForm />} */}
        </div>
    );
};

export default ProfileTabs;
