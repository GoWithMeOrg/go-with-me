"use client";

import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Human from "@/assets/icons/human.svg";

import classes from "./AuthPanel.module.css";
import Popup from "../Popup/Popup";
import { AuthModal } from "../AuthModal";
import { Button } from "../Button";
import { Loader } from "../Loader";
import Bell from "@/assets/icons/bell.svg";

export const AuthPanel = () => {
    const { data: session, status } = useSession();
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const handleShowAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowPopup(true);
    };

    return (
        <div className={classes.component}>
            {status === "unauthenticated" && (
                // <button className={classes.buttonLogIn} onClick={() => signIn()}>
                //     Sign In
                // </button>

                <>
                    <Button className={classes.buttonLogIn} onClick={handleShowAuth} text={"Sign In"} />
                    <Popup
                        {...{
                            showPopup,
                            setShowPopup,
                        }}
                        style={{
                            backgroundColor: "#F7F7FA",
                            width: "30rem",
                            height: "34.2rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "absolute",
                        }}
                    >
                        <AuthModal onClose={() => setShowPopup(false)} />
                    </Popup>
                </>
            )}

            {status === "loading" && <Loader />}
            {status === "authenticated" && (
                <>
                    {/* <p className={classes.title}>Привет, {session?.user?.name}</p> */}
                    <div className={classes.avatarAndMenu}>
                        <Link href="/profile">
                            {/* <img
                                className={classes.avatar}
                                src={session?.user?.image as string}
                                alt={session?.user?.name as string}
                            /> */}
                        </Link>
                        <div className={classes.menu}>
                            <Bell />
                            <Link href="/profile" className={classes.linkToProfile}>
                                <Human />
                            </Link>
                            <Button
                                className={classes.buttonLogIn}
                                onClick={() => {
                                    confirm("Вы уверены, что хотите выйти?") && signOut();
                                }}
                                text={"Sign Out"}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
