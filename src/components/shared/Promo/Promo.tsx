import React from "react";

import { Title } from "@/components/shared/Title";
import { Button } from "@/components/shared/Button";

import ArrowCircle from "@/assets/icons/arrowCircle.svg";
import PromoIcon from "@/assets/icons/promoIcon.svg";

import classes from "./Promo.module.css";

export const Promo = () => {
    return (
        <section className={classes.promo}>
            <div className={classes.promoDescription}>
                <Title title={"CRAFT YOUR ADVENTURE HERE"} tag={"h1"} />
                <p className={classes.promoDescription}>
                    Craft your trips and events effortlessly. Whether you&#39;re planning a&nbsp;weekend getaway
                    with&nbsp;friends, organizing a&nbsp;cultural exploration, arranging a&nbsp;concert, coordinating
                    a&nbsp;conference, or&nbsp;hosting a&nbsp;casual meeting, we&#39;re here to&nbsp;help you every step
                    of&nbsp;the way. Join us today and unlock a&nbsp;world of&nbsp;endless possibilities. Start crafting
                    your adventure now!
                </p>
                <Button className={classes.promoButton} resetDefaultStyles={true}>
                    Join
                    <ArrowCircle style={{ marginLeft: "0.7rem" }} />
                </Button>
            </div>

            <div className={classes.promoPicture}>
                <PromoIcon />
            </div>
        </section>
    );
};

export default Promo;