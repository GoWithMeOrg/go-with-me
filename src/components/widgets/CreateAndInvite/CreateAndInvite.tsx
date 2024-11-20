"use client";

import { FC, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { Popup } from "@/components/shared/Popup";
import { AuthModal } from "@/components/widgets/AuthModal";
import { Button } from "@/components/shared/Button";
import { Title } from "@/components/shared/Title";

import Join from "@/assets/icons/join.svg";

import classes from "./CreateAndInvite.module.css";

export enum Mode {
    EVENT,
    TRIP,
    BOTH,
}

interface CreateAndInviteProps {
    mode: Mode;
}

export const CreateAndInvite: FC<CreateAndInviteProps> = ({ mode }) => {
    const { data: session, status } = useSession();
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const handleShowAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowPopup(true);
    };

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
                        height: "34.2rem",
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
