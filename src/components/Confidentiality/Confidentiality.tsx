import { useState } from "react";
import classes from "./Confidentiality.module.css";

interface IConfidentiality {
    status: string | undefined;
}
export const Confidentiality = ({ status }: IConfidentiality) => {
    enum EventStatus {
        PUBLIC = "public",
        INVATION = "invation",
        PRIVATE = "private",
    }

    const [eventStatus, setEventStatus] = useState<string>(status ?? EventStatus.PUBLIC);

    return (
        <div className={classes.confidentiality}>
            <span className={classes.confidentialityTitle}>Confidentiality</span>

            <div className={classes.confidentialityWrapper}>
                <div className={classes.confidentialityRadio}>
                    <input
                        type="radio"
                        name="eventStatus"
                        id="public"
                        value={"Public"}
                        onChange={() => setEventStatus(EventStatus.PUBLIC)}
                        checked={eventStatus === "public"}
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
                        value={"Invation"}
                        onChange={() => setEventStatus(EventStatus.INVATION)}
                        checked={eventStatus === "invation"}
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
                        value={"Private"}
                        onChange={() => setEventStatus(EventStatus.PRIVATE)}
                        checked={eventStatus === "private"}
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

export default Confidentiality;
