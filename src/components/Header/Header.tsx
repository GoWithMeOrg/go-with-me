import { AuthPanel } from "../AuthPanel";
import SearchEvent from "../SearchEvent/SearchEvent";
import classes from "./Header.module.css";

export const Header = () => {
    return (
        <header className={classes.header}>
            <h1 className={classes.logo}>Go With Me</h1>
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
