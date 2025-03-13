"use client";

import { FC, useMemo } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { Popup } from "@/components/shared/Popup";
import { Button } from "@/components/shared/Button";
import { Title } from "@/components/shared/Title";

import { AuthModal } from "@/components/widgets/AuthModal";

import Join from "@/assets/icons/join.svg";

import { usePopup } from "@/app/hooks/usePopup";

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
    const { handleShowAuth, showPopup, setShowPopup } = usePopup();

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
                <Title title={"CREATE AND INVITE"} className={classes.title} tag={"h2"} />

                {status === "unauthenticated" && (
                    <div className={classes.buttons}>
                        <Button size="big" onClick={handleShowAuth}>
                            Create event
                        </Button>
                        <Button size="big" onClick={handleShowAuth}>
                            Create trip
                        </Button>
                    </div>
                )}

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

                {status === "authenticated" &&
                    ((mode === Mode.BOTH && (
                        <div className={classes.buttons}>
                            <Link className={classes.link} href="/events/new">
                                Create event
                            </Link>

                            <Link className={classes.link} href="/trips/new">
                                Create trip
                            </Link>
                        </div>
                    )) ||
                        (mode === Mode.EVENT && (
                            <Link className={linkCssString} href="/events/new">
                                Create event
                            </Link>
                        )) ||
                        (mode === Mode.TRIP && (
                            <Link className={linkCssString} href="/trips/new">
                                Create trip
                            </Link>
                        )))}
            </div>
            <div className={classes.description}>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim!
                </p>
            </div>
        </section>
    );
};

export default CreateAndInvite;
