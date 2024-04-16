import React from "react";
import classes from "./Footer.module.css";
import Link from "next/link";

export const Footer = () => {
    return (
        <footer className={classes.footer}>
            <div className={classes.footerContainer}>
                <div className={classes.footerLogIn}>
                    <Link href="/profile" className={classes.footerLink}>
                        Sign In
                    </Link>
                    <label className={classes.footerLogo}>Go With Me</label>
                </div>

                <div className={classes.footerBlockLinks}>
                    <div className={classes.footerBlock}>
                        <Link href="/events" className={classes.footerLink}>
                            Events
                        </Link>

                        <Link href="/profile" className={classes.footerLink}>
                            Profile
                        </Link>
                    </div>
                    <div className={classes.footerBlock}>
                        <Link href="/privacy_policy" className={classes.footerLink}>
                            Privacy policy
                        </Link>

                        <Link href="/terms_of_use" className={classes.footerLink}>
                            Terms of use
                        </Link>
                    </div>
                    <div className={classes.footerBlock}>
                        <Link href="/faq" className={classes.footerLink}>
                            FAQ
                        </Link>

                        <Link href="/write_to_use" className={classes.footerLink}>
                            Write to use
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
