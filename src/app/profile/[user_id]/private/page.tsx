"use client";

import React, { useState } from "react";
import { NextPage } from "next";

import { ButtonBack } from "@/components/shared/ButtonBack";
import { Title } from "@/components/shared/Title";
import { ButtonLink } from "@/components/shared/ButtonLink";

import { Navbar } from "@/components/widgets/Navbar";
import { NavbarTabs } from "@/components/widgets/Navbar/models";
import { ProfileForm } from "@/components/widgets/ProfileForm";
import { Notifications } from "@/components/widgets/Notifications";
import { Companions } from "@/components/widgets/Companions";

import classes from "./page.module.css";

const Profile: NextPage = () => {
    const [activeTab, setActiveTab] = useState(NavbarTabs.PERSONAL);

    const handleTabClick = (tab: NavbarTabs) => {
        setActiveTab(tab);
    };

    return (
        <div className={classes.profilePage}>
            <div className={classes.formWrapper}>
                <ButtonBack />
                <div className={classes.avatarTitle}>
                    <Title className={classes.formTitle} title="MY ACCOUNT" tag={"h2"} />
                </div>

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
            </div>
        </div>
    );
};

export default Profile;
