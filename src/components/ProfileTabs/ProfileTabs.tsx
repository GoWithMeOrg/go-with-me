"use client";

import classes from "./ProfileTabs.module.css";
import { Button } from "../Button";
import Link from "next/link";
import { useState } from "react";
import { Navbar } from "../Navbar";
import { ProfileForm } from "../ProfileForm";
import { NotificationsList } from "../NotificationsList";

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
                    <Button className={classes.buttonCreate}>
                        <Link className={classes.buttonCreateLink} href="/events/new">
                            Create event
                        </Link>
                    </Button>
                    <Button className={classes.buttonCreate}>
                        <Link className={classes.buttonCreateLink} href="/trips/new">
                            Create trip
                        </Link>
                    </Button>
                </div>
            </div>
            {activeTab === "personal" && <ProfileForm />}
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
