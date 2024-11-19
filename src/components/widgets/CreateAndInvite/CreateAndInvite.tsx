"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import Join from "@/assets/icons/join.svg";
import { Popup } from "@/components/shared/Popup";
import { AuthModal } from "@/components/widgets/AuthModal";
import { Button } from "@/components/shared/Button";
import { Title } from "@/components/shared/Title";

import classes from "./CreateAndInvite.module.css";

export const CreateAndInvite = () => {
    const { data: session, status } = useSession();
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const handleShowAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowPopup(true);
    };

    return (
        <section className={classes.createAndInvite}>
            <Join className={classes.logoJoin} />
            <div className={classes.createAndInviteWrapper}>
                <Title title={"CREATE AND INVITE"} className={classes.createAndInviteTitle} tag={"h2"} />

                {status === "unauthenticated" && (
                    <div className={classes.createAndInviteButtons}>
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

                {status === "authenticated" && (
                    <div className={classes.createAndInviteButtons}>
                        <Link className={classes.createAndInviteButtonLink} href="/events/new">
                            Create event
                        </Link>

                        <Link className={classes.createAndInviteButtonLink} href="/trips/new">
                            Create trip
                        </Link>
                    </div>
                )}
            </div>
            <div className={classes.createAndInviteDescr}>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim!
                </p>
            </div>
        </section>
    );
};

export default CreateAndInvite;
