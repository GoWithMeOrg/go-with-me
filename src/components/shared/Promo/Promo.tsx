import React from "react";

import ArrowCircle from "@/assets/icons/arrowCircle.svg";
import PromoIcon from "@/assets/icons/promoIcon.svg";

import { Title } from "@/components/shared/Title";
import { Button } from "@/components/shared/Button";

import { AuthModal } from "@/components/widgets/AuthModal";
import { Popup } from "../Popup";
import { usePopup } from "@/app/hooks/usePopup";

import classes from "./Promo.module.css";
export const Promo = () => {
    const { handleShowAuth, showPopup, setShowPopup } = usePopup();

    return (
        <section className={classes.promo}>
            <div className={classes.promoDescription}>
                <Title title={"CRAFT YOUR ADVENTURE HERE"} tag={"h1"} />
                <p className={classes.promoText}>
                    Craft your trips and events effortlessly. Whether you&#39;re planning a&nbsp;weekend getaway
                    with&nbsp;friends, organizing a&nbsp;cultural exploration, arranging a&nbsp;concert, coordinating
                    a&nbsp;conference, or&nbsp;hosting a&nbsp;casual meeting, we&#39;re here to&nbsp;help you every step
                    of&nbsp;the way. Join us today and unlock a&nbsp;world of&nbsp;endless possibilities. Start crafting
                    your adventure now!
                </p>

                <div className={classes.promoButton}>
                    <Button className={classes.promoLink} resetDefaultStyles={true} onClick={handleShowAuth}>
                        Join
                        <ArrowCircle style={{ marginLeft: "0.75rem" }} />
                    </Button>
                </div>

                <Popup
                    {...{
                        showPopup,
                        setShowPopup,
                    }}
                    style={{
                        backgroundColor: "#F7F7FA",
                        width: "30rem",
                        height: "24rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                    }}
                >
                    <AuthModal onClose={() => setShowPopup(false)} />
                </Popup>
            </div>

            <PromoIcon style={{ marginBottom: "10px" }} />
        </section>
    );
};

export default Promo;
