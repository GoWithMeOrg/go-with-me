import { AuthPanel } from "@/components/AuthPanel";
import classes from "@/app/main.module.css";

export default function HomePage() {
    return (
        <main className={classes.main}>
            <AuthPanel />
            Social meetings <a href="https://github.com/GoWithMeOrg/go-with-me">GoWithMeOrg/go-with-me</a>
        </main>
    );
}
