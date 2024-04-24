import React from "react";
import classes from "./Promo.module.css";
import Arrow from "@/assets/icons/arrow.svg";
import PromoImg from "@/assets/icons/promoImg.svg";

export const Promo = () => {
    return (
        <div className={classes.promo}>
            <div className={classes.promoDescription}>
                <h1 className={classes.promoTitle}>Craft Your Adventure Here</h1>
                <p className={classes.promoDescription}>
                    Craft your trips and events effortlessly. Whether you&#39;re planning a weekend getaway with
                    friends, organizing a cultural exploration, arranging a concert, coordinating a conference, or
                    hosting a casual meeting, we&#39;re here to help you every step of the way. Join us today and unlock
                    a world of endless possibilities. Start crafting your adventure now!
                </p>
                <div className={classes.arrow}>
                    <div>Join</div>
                    <Arrow />
                </div>
            </div>

            <div className={classes.promoPicture}>
                <PromoImg />
            </div>
        </div>
    );
};

export default Promo;
