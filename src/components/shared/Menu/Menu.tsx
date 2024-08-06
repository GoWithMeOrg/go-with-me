import React from "react";
import Link from "next/link";

import classes from "./Menu.module.css";

export const Menu = () => {
    return (
        <nav className={classes.component}>
            <ul className={classes.itemList}>
                <li>
                    <Link href="/" className={classes.link}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/events" className={classes.link}>
                        Events
                    </Link>
                </li>
                <li>
                    <Link href="/trips" className={classes.link}>
                        Trips
                    </Link>
                </li>
            </ul>
        </nav>
    );
};
