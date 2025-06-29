import React from "react";

import classes from "./DeleteFriendModal.module.css";

interface DeleteFriendModalProps {
    name?: string;
    children?: React.ReactNode;
    companionCounter?: number;
}

export const DeleteFriendModal: React.FC<DeleteFriendModalProps> = ({ name, children, companionCounter }) => {
    return (
        <div className={classes.modalContent}>
            {name && (
                <p className={classes.message}>
                    Удалить из компанионов <br /> {name}?
                </p>
            )}

            {companionCounter && <p className={classes.message}>Удалить {companionCounter} компанионов?</p>}

            <div className={classes.actions}>{children}</div>
        </div>
    );
};
