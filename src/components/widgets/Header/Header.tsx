import { AuthPanel } from "@/components/widgets/AuthPanel";
import SearchEvent from "@/components/widgets/SearchEvent/SearchEvent";
import Logo from "@/assets/icons/logo.svg";

import classes from "./Header.module.css";

export const Header = () => {
    return (
        <header className={classes.header}>
            <Logo />
            <div className={classes.headerSearch}>
                <SearchEvent className={classes.headerSearchEvent} />
            </div>
            <div className={classes.headerAuth}>
                <AuthPanel />
            </div>
        </header>
    );
};

export default Header;
