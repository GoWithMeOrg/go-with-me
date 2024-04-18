import { AuthPanel } from "../AuthPanel";
import SearchEvent from "../SearchEvent/SearchEvent";
import { SearchIcon } from "../SearchIcon";
import Human from "@/assets/icons/human.svg";
import classes from "./Header.module.css";

export const Header = () => {
    return (
        <header className={classes.header}>
            <div className={classes.container}>
                <h1 className={classes.logo}>Go With Me</h1>
                <div className={classes.headerSerch}>
                    <SearchEvent className={classes.headerSerchEvent} />
                    {/* <SearchIcon /> */}
                </div>
                <div className={classes.headerAuth}>
                    <Human />
                    <AuthPanel />
                </div>
            </div>
        </header>
    );
};

export default Header;
