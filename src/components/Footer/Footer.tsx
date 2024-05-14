"use client";
import React, { useState } from "react";
import classes from "./Footer.module.css";
import Link from "next/link";
import LogoFooter from "@/assets/icons/logoFooter.svg";
import { signOut, useSession } from "next-auth/react";
import Popup from "../Popup/Popup";
import { AuthModal } from "../AuthModal";
import { Button } from "../Button";

export const Footer = () => {
    const { data: session, status } = useSession();
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const handleShowAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowPopup(true);
    };

    return (
        <footer className={classes.footer}>
            {status === "unauthenticated" && (
                <div className={classes.footerContainer}>
                    <div className={classes.footerLogIn}>
                        <Button onClick={handleShowAuth} className={classes.footerLink} text={"Sign In"} />
                        <LogoFooter />
                    </div>
                    <div className={classes.footerBlockLinks}>
                        <div className={classes.footerBlock}>
                            <Button onClick={handleShowAuth} className={classes.footerLink} text={"Events"} />
                            <Button onClick={handleShowAuth} className={classes.footerLink} text={"Profile"} />
                        </div>
                        <div className={classes.footerBlock}>
                            <Button onClick={handleShowAuth} className={classes.footerLink} text={"Privacy policy"} />
                            <Button onClick={handleShowAuth} className={classes.footerLink} text={"Terms of use"} />
                        </div>
                        <div className={classes.footerBlock}>
                            <Button onClick={handleShowAuth} className={classes.footerLink} text={"FAQ"} />
                            <Button onClick={handleShowAuth} className={classes.footerLink} text={"Write to use"} />
                        </div>

                        <Popup
                            {...{
                                showPopup,
                                setShowPopup,
                            }}
                            style={{
                                backgroundColor: "#F7F7FA",
                                width: "30rem",
                                height: "34.2rem",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "absolute",
                            }}
                        >
                            <AuthModal onClose={() => setShowPopup(false)} />
                        </Popup>
                    </div>
                </div>
            )}

            {status === "authenticated" && (
                <div className={classes.footerContainer}>
                    <div className={classes.footerLogIn}>
                        <Button onClick={() => signOut()} className={classes.footerLink}>
                            Sign Out
                        </Button>
                        <LogoFooter />
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
            )}
        </footer>
    );
};

export default Footer;
