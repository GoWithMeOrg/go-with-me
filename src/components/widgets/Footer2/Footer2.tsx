"use client";

import { useSession } from "next-auth/react";

export const Footer2 = () => {
    const { data: session, status } = useSession();
    console.log(session, status);
    return (
        <footer>
            Hello world {status} {JSON.stringify(session)}
            <p>{session?.user.name}</p>
        </footer>
    );
};
