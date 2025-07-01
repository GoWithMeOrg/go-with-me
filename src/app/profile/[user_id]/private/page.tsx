"use client";

import React from "react";
import { NextPage } from "next";

import { ProfileTabs } from "@/components/widgets/ProfileTabs";
//import { Avatar } from "@/components/widgets/";

import { ButtonBack } from "@/components/shared/ButtonBack";
import { Title } from "@/components/shared/Title";

import classes from "./page.module.css";

const Profile: NextPage = () => {
    return (
        <div className={classes.profilePage}>
            <div className={classes.formWrapper}>
                <ButtonBack />
                <div className={classes.avatarTitle}>
                    <Title className={classes.formTitle} title="MY ACCOUNT" tag={"h2"} />
                </div>
                <ProfileTabs />
            </div>
        </div>
    );
};

export default Profile;
