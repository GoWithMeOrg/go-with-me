import { AuthPanel } from "@/components/widgets/AuthPanel";
import SearchEvent from "@/components/widgets/SearchEvent/SearchEvent";
import Logo from "@/assets/icons/logo.svg";

import classes from "./Header.module.css";
import Link from "next/link";

export const Header = () => {
    return (
        <header className={classes.header}>
            <Link href={"/events"}>
                <Logo />
            </Link>

            <div className={classes.headerAuth}>
                <AuthPanel />
            </div>
        </header>
    );
};

export default Header;
