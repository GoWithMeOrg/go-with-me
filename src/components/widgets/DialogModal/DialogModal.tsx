import classes from "./DialogModal.module.css";

interface DialogModalProps {
    name?: string;
    children?: React.ReactNode;
    companionCounter?: number;
    mode: DialogMode;
}

export enum DialogMode {
    ADD = "add",
    DELETE = "del",
}

export const DialogModal: React.FC<DialogModalProps> = ({ name, children, companionCounter, mode }) => {
    return (
        <div className={classes.modalContent}>
            {name && mode === "add" && (
                <p className={classes.message}>
                    Отправить заявку в коммпанионы <br /> {name}?
                </p>
            )}

            {name && mode === "del" && (
                <p className={classes.message}>
                    Удалить из компанионов <br /> {name}?
                </p>
            )}

            {Boolean(companionCounter) && <p className={classes.message}>Удалить {companionCounter} компанионов?</p>}

            <div className={classes.actions}>{children}</div>
        </div>
    );
};
