"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

import { Avatar } from "@/components/shared/Avatar";

import classes from "./Footer2.module.css";

export const Footer2 = () => {
    const { data: session, status } = useSession();
    console.log(session, status);

    return (
        <footer className={classes.footer}>
            {session && (
                <div className={classes.container}>
                    {session.user.name && (
                        <Avatar name={session.user.name} scale={1} image={session.user.image ?? undefined} />
                    )}
                    <p>{session.user.name}</p>
                    <p>{session.user.email}</p>
                </div>
            )}
        </footer>
    );
};

export default Footer2;
