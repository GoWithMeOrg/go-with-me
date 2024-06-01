import { useState } from "react";
import classes from "./EventStatus.module.css";

interface IEventStatus {
    status: string | undefined;
    onStatusChange: (status: string) => void;
}
export const EventStatus = ({ status, onStatusChange }: IEventStatus) => {
    enum EventStatus {
        PUBLIC = "public",
        INVATION = "invation",
        PRIVATE = "private",
    }

    const [isEventStatus, setIsEventStatus] = useState<string>(status ?? EventStatus.PUBLIC);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const status = e.target.value;
        onStatusChange(status);
        setIsEventStatus(status);
    };

    return (
        <div className={classes.confidentiality}>
            <span className={classes.confidentialityTitle}>Confidentiality</span>

            <div className={classes.confidentialityWrapper}>
                <div className={classes.confidentialityRadio}>
                    <input
                        type="radio"
                        name="eventStatus"
                        id="public"
                        value={EventStatus.PUBLIC}
                        onChange={handleChange}
                        checked={isEventStatus === EventStatus.PUBLIC}
                        className={classes.confidentialityInput}
                    />
                    <label className={classes.confidentialityLabel} htmlFor="public">
                        Public event
                    </label>
                </div>

                <div className={classes.confidentialityRadio}>
                    <input
                        type="radio"
                        name="eventStatus"
                        id="invation"
                        value={EventStatus.INVATION}
                        onChange={handleChange}
                        checked={isEventStatus === EventStatus.INVATION}
                        className={classes.confidentialityInput}
                    />
                    <label className={classes.confidentialityLabel} htmlFor="invation">
                        By invation only
                    </label>
                </div>

                <div className={classes.confidentialityRadio}>
                    <input
                        type="radio"
                        name="eventStatus"
                        id="private"
                        value={EventStatus.PRIVATE}
                        onChange={handleChange}
                        checked={isEventStatus === EventStatus.PRIVATE}
                        className={classes.confidentialityInput}
                    />
                    <label className={classes.confidentialityLabel} htmlFor="private">
                        Private event
                    </label>
                </div>
            </div>
        </div>
    );
};

export default EventStatus;
