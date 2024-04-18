import { AuthPanel } from "../AuthPanel";
import SearchEvent from "../SearchEvent/SearchEvent";
import classes from "./Header.module.css";

export const Header = () => {
    return (
        <header className={classes.header}>
            <div className={classes.container}>
                <h1 className={classes.logo}>Go With Me</h1>
                <div className={classes.headerSerch}>
                    <SearchEvent className={classes.headerSerchEvent} />
                </div>
                <div className={classes.headerAuth}>
                    <AuthPanel />
                </div>
            </div>
        </header>
    );
};

export default Header;
