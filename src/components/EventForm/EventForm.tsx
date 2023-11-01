import React, { FC } from "react";
import classes from "./EventForm.module.css";

interface EventFormProps {
    tripName: string;
    description: string;
    startDate: string;
    endDate: string;
    isPrivate: boolean;
    bannerImage: string;
}

const EventForm: FC<EventFormProps> = ({ tripName, description, startDate, endDate, isPrivate, bannerImage }) => {
    return (
        <div className={classes.component}>
            <form>
                <h2>Registration form</h2>

                <label>
                    <span>Trip Name:</span>
                    <input type="text" name="tripName" value={tripName} required />
                </label>

                <label>
                    <span>Description:</span>
                    <textarea name="description">{description}</textarea>
                </label>

                <label>
                    <span>Start date:</span>
                    <input type="date" name="startDate" defaultValue={startDate} />
                </label>

                <label>
                    <span>End date:</span>
                    <input type="date" name="endDate" defaultValue={endDate} />
                </label>

                <label>
                    <span>Is private:</span>
                    <input type="checkbox" name="isPrivate" defaultChecked={isPrivate} />
                </label>

                <label>
                    <span>Banner Image:</span>
                    <input type="file" name={bannerImage} accept=".jpg, .jpeg, .png" />
                </label>

                <button>Send</button>
            </form>
        </div>
    );
};

export { EventForm };
