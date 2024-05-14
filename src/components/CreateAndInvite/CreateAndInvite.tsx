"use client";

import { useSession } from "next-auth/react";
import classes from "./CreateAndInvite.module.css";
import Join from "@/assets/icons/join.svg";
import { useState } from "react";
import Popup from "../Popup/Popup";
import { AuthModal } from "../AuthModal";
import Link from "next/link";

export const CreateAndInvite = () => {
    const { data: session, status } = useSession();
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const handleShowAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowPopup(true);
    };

    return (
        <div className={classes.createAndInvite}>
            <div className={classes.logoJoin}>
                <Join />
            </div>
            <div className={classes.createAndInviteWrapper}>
                <div className={classes.createAndInviteTitle}>
                    <h2>CREATE AND INVITE</h2>
                </div>

                {status === "unauthenticated" && (
                    <div className={classes.createAndInviteButtons}>
                        <button onClick={handleShowAuth} className={classes.createAndInviteButton}>
                            Create event
                        </button>
                        <button onClick={handleShowAuth} className={classes.createAndInviteButton}>
                            Create trip
                        </button>
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
                        {/* <Link href="/events/new">Create New Event</Link> */}
                        <button className={classes.createAndInviteButton}>
                            <Link className={classes.createAndInviteButtonLink} href="/events/new">
                                Create event
                            </Link>
                        </button>
                        <button className={classes.createAndInviteButton}>
                            <Link className={classes.createAndInviteButtonLink} href="/trips/new">
                                Create trip
                            </Link>
                        </button>
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
