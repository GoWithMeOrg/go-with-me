import React from "react";
import classes from "./page.module.css";
import Arrow from "@/assets/icons/arrow.svg";
import { Button } from "@/components/Button";
import { TitleH2 } from "@/components/TitleH2";
import Image from "next/image";
import profile from "@/assets/images/profile.png";
import { ProfileForm } from "@/components/ProfileForm";
import { IEvent } from "@/database/models/Event";

export const Profile = () => {
    return (
        <div className={classes.container}>
            <div className={classes.formWrapper}>
                <Button className={classes.arrowButton}>
                    <Arrow />
                </Button>
                <div className={classes.avatarTitle}>
                    <div className={classes.userAvatar}>
                        <Image
                            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                            src={profile}
                            alt="img"
                        />
                    </div>
                    <TitleH2 className={classes.formTitle} title="MY ACCOUNT" />
                </div>
                <ProfileForm eventData={undefined} />
            </div>
        </div>
    );
};

export default Profile;
