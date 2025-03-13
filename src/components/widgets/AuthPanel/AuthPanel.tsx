"use client";

import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

import Human from "@/assets/icons/human.svg";
import { Popup } from "@/components/shared/Popup";
import { AuthModal } from "@/components/widgets/AuthModal";
import { Button } from "@/components/shared/Button";

import classes from "./AuthPanel.module.css";

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
                <>
                    <Button size="big" onClick={handleShowAuth}>
                        Sign In
                    </Button>
                    <Popup
                        {...{
                            showPopup,
                            setShowPopup,
                        }}
                        style={{
                            backgroundColor: "#F7F7FA",
                            width: "30rem",
                            height: "24rem",
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

            {status === "authenticated" && (
                <>
                    <div className={classes.avatarAndMenu}>
                        <Link href="/profile"></Link>
                        <div className={classes.menu}>
                            <Link href="/profile" className={classes.linkToProfile}>
                                <Human />
                            </Link>
                            <Button
                                size="big"
                                onClick={() => {
                                    confirm("Вы уверены, что хотите выйти?") && signOut();
                                }}
                            >
                                Sign Out
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
