"use client";

import React from "react";
import { NextPage } from "next";

import { ProfileTabs } from "@/components/widgets/ProfileTabs";
import { Avatar } from "@/components/widgets/Avatar";

import { Button } from "@/components/shared/Button";
import { Title } from "@/components/shared/Title";

import Arrow from "@/assets/icons/arrow.svg";

import classes from "./page.module.css";

const Profile: NextPage = () => {
    return (
        <div className={classes.profilePage}>
            <div className={classes.formWrapper}>
                <Button className={classes.arrowButton} resetDefaultStyles={true}>
                    <Arrow />
                </Button>
                <div className={classes.avatarTitle}>
                    <Avatar name={""} />
                    <Title className={classes.formTitle} title="MY ACCOUNT" tag={"h2"} />
                </div>
                <ProfileTabs />
            </div>
        </div>
    );
};

export default Profile;
