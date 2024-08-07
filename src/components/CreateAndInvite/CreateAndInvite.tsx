"use client";

import { useSession } from "next-auth/react";
import classes from "./CreateAndInvite.module.css";
import Join from "@/assets/icons/join.svg";
import { useState } from "react";
import Popup from "../Popup/Popup";
import { AuthModal } from "../AuthModal";
import Link from "next/link";
import { Button } from "../Button";
import { Title } from "../Title";

export const CreateAndInvite = () => {
    const { data: session, status } = useSession();
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const handleShowAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowPopup(true);
    };

    return (
        <div className={classes.createAndInvite}>
            <Join className={classes.logoJoin} />
            <div className={classes.createAndInviteWrapper}>
                <Title title={"CREATE AND INVITE"} className={classes.createAndInviteTitle} tag={"h2"} />

                {status === "unauthenticated" && (
                    <div className={classes.createAndInviteButtons}>
                        <Button
                            onClick={handleShowAuth}
                            className={classes.createAndInviteButtonUnAuth}
                            resetDefaultStyles={true}
                            text={"Create event"}
                        />
                        <Button
                            onClick={handleShowAuth}
                            className={classes.createAndInviteButtonUnAuth}
                            resetDefaultStyles={true}
                            text={"Create trip"}
                        />
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
                        <Button className={classes.createAndInviteButton} resetDefaultStyles={true}>
                            <Link className={classes.createAndInviteButtonLink} href="/events/new">
                                Create event
                            </Link>
                        </Button>
                        <Button className={classes.createAndInviteButton} resetDefaultStyles={true}>
                            <Link className={classes.createAndInviteButtonLink} href="/trips/new">
                                Create trip
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
            <div className={classes.createAndInviteDescr}>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim!
                </p>
            </div>
        </div>
    );
};

export default CreateAndInvite;
