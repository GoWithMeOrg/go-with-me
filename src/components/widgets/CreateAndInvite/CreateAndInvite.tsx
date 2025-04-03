"use client";

import { FC, useMemo } from "react";
import Link from "next/link";

import { Popup } from "@/components/shared/Popup";
import { usePopup } from "@/components/shared/Popup/hooks";
import { Button } from "@/components/shared/Button";
import { Title } from "@/components/shared/Title";

import { AuthModal } from "@/components/widgets/AuthModal";

import Join from "@/assets/icons/join.svg";

import classes from "./CreateAndInvite.module.css";

export enum Mode {
    EVENT,
    TRIP,
    BOTH,
}

interface CreateAndInviteProps {
    mode: Mode;
    status: string;
}

export const CreateAndInvite: FC<CreateAndInviteProps> = ({ mode, status }) => {
    const popupMode: "auth" = "auth";
    const { handleShowPopup, handleHidePopup, showPopup, setShowPopup } = usePopup({ popupMode });

    const linkCssString = useMemo(
        () =>
            [classes.link, mode === Mode.EVENT && classes.one, mode === Mode.TRIP && classes.one]
                .filter(Boolean)
                .join(" "),
        [mode],
    );

    return (
        <section className={classes.container}>
            <Join className={classes.logo} />
            <div className={classes.wrapper}>
                <Title title={"СОЗДАТЬ И ПРИГЛАСИТЬ"} className={classes.title} tag={"h2"} />

                {status === "unauthenticated" && (
                    <div className={classes.buttons}>
                        <Button size="big" onClick={handleShowPopup}>
                            Создать событие
                        </Button>
                        <Button size="big" onClick={handleShowPopup}>
                            Создать поездку
                        </Button>
                    </div>
                )}

                <Popup popupMode={popupMode} showPopup={showPopup} setShowPopup={setShowPopup}>
                    <AuthModal onClose={handleHidePopup} />
                </Popup>

                {status === "authenticated" &&
                    ((mode === Mode.BOTH && (
                        <div className={classes.buttons}>
                            <Link className={classes.link} href="/events/new">
                                Создать событие
                            </Link>

                            <Link className={classes.link} href="/trips/new">
                                Создать поездку
                            </Link>
                        </div>
                    )) ||
                        (mode === Mode.EVENT && (
                            <Link className={linkCssString} href="/events/new">
                                Создать событие
                            </Link>
                        )) ||
                        (mode === Mode.TRIP && (
                            <Link className={linkCssString} href="/trips/new">
                                Создать поездку
                            </Link>
                        )))}
            </div>
            <div className={classes.description}>
                {/* <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim!
                </p> */}
            </div>
        </section>
    );
};

export default CreateAndInvite;
