import React, { useState } from "react";

import { useCompanions } from "../Companions/hooks/useCompanions";
import { Button } from "@/components/shared/Button";

import classes from "./DeleteFriendModal.module.css";

interface DeleteFriendModalProps {
    onClose: () => void;
    companionId: string;
    name: string;
}

const DeleteFriendModal: React.FC<DeleteFriendModalProps> = ({ onClose, companionId, name }) => {
    const { removeCompanion } = useCompanions();

    const handleDeleteCompanion = () => {
        try {
            removeCompanion(companionId);
            onClose();
        } catch (error) {
            console.error("DeleteFriendModal - Error deleting companion: ", error);
        }
    };

    return (
        <div className={classes.modalContent}>
            <p className={classes.message}>
                Удалить из компанионов <br /> {name}?
            </p>
            <div className={classes.actions}>
                <Button onClick={handleDeleteCompanion}>Да</Button>
                <Button onClick={onClose}>Отмена</Button>
            </div>
        </div>
    );
};

export default DeleteFriendModal;
