import { FC } from "react";

import dayjs from "dayjs";

import { Button } from "@/components/shared/Button";
import { Title } from "@/components/shared/Title";

import Close from "@/assets/icons/close.svg";

import classes from "./SuccessModal.module.css";

export interface SuccessModalProps {
    name?: string;
    children?: React.ReactNode;
    // companionCounter?: number;
    // mode?: DialogMode;
    closePopup?: () => void;
    selectedEvent: {
        _id: string;
        name: string;
        startDate: string;
    } | null;
}

export const SuccessModal: FC<SuccessModalProps> = ({ closePopup, name, selectedEvent }) => {
    return (
        <div className={classes.modalContent}>
            <Button resetDefaultStyles className={classes.modalClose} onClick={closePopup}>
                <Close />
            </Button>

            <Title className={classes.titleModal} tag="h3">
                Приглашение успешно <br />
                отправлено!
            </Title>

            <p className={classes.header}>
                Получатель: <span className={classes.name}>{name ? name : "Групповая рассылка"}</span>
            </p>
            <p className={classes.header}>
                Мероприятие:
                <span className={classes.date}>{dayjs(selectedEvent?.startDate).format("DD.MM.YYYY")}</span>
                {" | "}
                {selectedEvent?.name}
            </p>

            <Button stretch className={classes.buttonOk} onClick={closePopup}>
                Ок
            </Button>
        </div>
    );
};

export default SuccessModal;
