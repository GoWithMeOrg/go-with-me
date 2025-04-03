"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

import Human from "@/assets/icons/human.svg";
import { Popup } from "@/components/shared/Popup";
import { AuthModal } from "@/components/widgets/AuthModal";
import { Button } from "@/components/shared/Button";

import { usePopup } from "@/components/shared/Popup/hooks";

import classes from "./AuthPanel.module.css";

export const AuthPanel = () => {
    const { data: session, status } = useSession();

    const popupMode: "auth" = "auth";

    const { showPopup, setShowPopup, handleShowPopup, handleHidePopup } = usePopup({ popupMode });

    return (
        <div className={classes.component}>
            {status === "unauthenticated" && (
                <>
                    <Button size="big" onClick={handleShowPopup}>
                        Войти
                    </Button>
                    <Popup showPopup={showPopup} setShowPopup={setShowPopup} popupMode={"auth"}>
                        <AuthModal onClose={handleHidePopup} />
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
                                Выйти
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
