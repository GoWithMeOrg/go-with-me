import { Title } from "@/components/shared/Title";
import { Button } from "@/components/shared/Button";

import Close from "@/assets/icons/close.svg";

import classes from "./DialogModal.module.css";
import { FC } from "react";
import { useDialogModal } from "./hooks/useDialogModal";
export interface DialogModalProps {
    name?: string;
    children?: React.ReactNode;
    companionCounter?: number;
    mode?: DialogMode;
    closePopup?: () => void;
    disabled?: boolean;
}

export enum DialogMode {
    ADD = "add",
    DEL = "del",
    INVITATION = "invitation",
}

export const DialogModal: FC<DialogModalProps> = ({ name, children, companionCounter, mode, closePopup, disabled }) => {
    return (
        <div className={classes.modalContent}>
            {name && mode === DialogMode.ADD && (
                <p className={classes.message}>
                    Отправить заявку в компанионы <br /> {name}?
                </p>
            )}

            {name && mode === DialogMode.DEL && (
                <p className={classes.message}>
                    Удалить из компанионов <br /> {name}?
                </p>
            )}

            {name && mode === DialogMode.INVITATION && (
                <>
                    <Button resetDefaultStyles onClick={closePopup} className={classes.modalClose}>
                        <Close />
                    </Button>
                    <Title className={classes.titleModal} tag="h3">
                        Отправить приглашение <br /> {name}
                    </Title>
                    <p className={classes.header}>Выбрать мероприятие</p>
                    <ul className={classes.list}>{children}</ul>

                    <Button stretch disabled={disabled} className={classes.buttonSend} onClick={closePopup}>
                        Отправить
                    </Button>
                </>
            )}

            {Boolean(companionCounter) && mode === DialogMode.DEL && (
                <p className={classes.message}>Удалить {companionCounter} компанионов?</p>
            )}

            {Boolean(companionCounter) && mode === DialogMode.INVITATION && (
                <p className={classes.message}>Пригласить {companionCounter} компанионов?</p>
            )}

            {/* Только для не-INVITATION режимов рендерим actions */}
            {mode !== DialogMode.INVITATION && <div className={classes.actions}>{children}</div>}
        </div>
    );
};
