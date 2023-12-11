import Link from "next/link";
import React from "react";
import classes from "./Menu.module.css";

export const Menu = () => {
    return (
        <menu>
            <ul className={classes.itemList}>
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
        </menu>
    );
};
