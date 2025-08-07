import React, { FC } from "react";

import dayjs from "dayjs";

import Plus from "@/assets/icons/plus.svg";
import Checkbox from "@/assets/icons/checkbox.svg";

import classes from "./InvationEvent.module.css";

export interface InvationEventProps {
    data: [];
    selectedEvent: string | null;
    handleSelectEvent: (id: string) => void;
}

export const InvationEvent: FC<InvationEventProps> = ({ data, selectedEvent, handleSelectEvent }) => {
    return (
        <>
            {data?.map((event: any) => (
                <li key={event._id}>
                    <button className={classes.itemContent} onClick={() => handleSelectEvent(event._id)}>
                        {selectedEvent === event._id ? <Checkbox /> : <Plus className={classes.plus} />}

                        <span className={classes.date}>{dayjs(event.startDate).format("DD.MM.YYYY")}</span>
                        {" | "}
                        {event.name}
                    </button>
                </li>
            ))}
        </>
    );
};

export default InvationEvent;
