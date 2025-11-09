import { FC } from "react";

import { Button } from "@/components/shared/Button";

import Heart from "@/assets/icons/heart.svg";

import { LikeProps } from "./types/LikeProps";

import useLike from "./hooks/useLike";

import classes from "./Like.module.css";

export const Like: FC<LikeProps> = ({ event_id, user_id }) => {
    const { handleLike, isLiked } = useLike({ event_id, user_id });
    return (
        <Button className={classes.like} onClick={handleLike}>
            <Heart className={isLiked ? classes.liked : ""} />
        </Button>
    );
};

export default Like;
