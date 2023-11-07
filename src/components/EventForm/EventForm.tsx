import React, { FC } from "react";
import classes from "./EventForm.module.css";

interface EventFormProps {
    event: {
        tripName: string;
        description: string;
        startDate: string;
        endDate: string;
        isPrivate: boolean;
        bannerImage: string;
    };
}

const EventForm: FC<EventFormProps> = ({ event }) => {
    const { tripName, description, startDate, endDate, isPrivate, bannerImage } = event;
    return (
        <div className={classes.component}>
            <form>
                <h2>Registration form</h2>

                <label className={classes.form_item}>
                    <span>Trip Name:</span>
                    <input type="text" name="tripName" value={tripName} required />
                </label>

                <label className={classes.form_item}>
                    <span>Description:</span>
                    <textarea name="description">{description}</textarea>
                </label>

                <label className={classes.form_item}>
                    <span>Start date:</span>
                    <input type="date" name="startDate" defaultValue={startDate} />
                </label>

                <label className={classes.form_item}>
                    <span>End date:</span>
                    <input type="date" name="endDate" defaultValue={endDate} />
                </label>

                <label className={classes.form_item}>
                    <span>Is private:</span>
                    <input type="checkbox" name="isPrivate" defaultChecked={isPrivate} />
                </label>

                <label className={classes.form_item}>
                    <span>Banner Image:</span>
                    <input type="file" name={bannerImage} accept=".jpg, .jpeg, .png" />
                </label>

                <button>Send</button>
            </form>
        </div>
    );
};

export { EventForm };
