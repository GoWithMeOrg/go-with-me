import React from "react";

import { MoreLink } from "@/components/shared/MoreLink";
import { Title } from "@/components/shared/Title";
import PromoIcon from "@/assets/icons/promoIcon.svg";

import classes from "./Promo.module.css";

export const Promo = () => {
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
                <div className={classes.promoLink}>
                    <MoreLink link={""} text={"Join"} size={"big"} />
                </div>
            </div>

            <PromoIcon style={{ marginBottom: "10px" }} />
        </section>
    );
};

export default Promo;
