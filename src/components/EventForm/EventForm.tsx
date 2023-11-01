import classes from "./EventForm.module.css";

const EventForm = () => {
    return <div className={classes.component}>
        <form>
            <h2>Registration form</h2>

            <label>
                <span>Trip Name:</span>
                <input type="text" name="tripName" required />
            </label>

            <label>
                <span>Description:</span>
                <textarea name="description">enter text</textarea>
            </label>

            <label>
                <span>Start date:</span>
                <input type="date" name="startDate" min="2023-01-01" max="2023-12-31" />
            </label>

            <label>
                <span>End date:</span>
                <input type="date" name="endDate" min="2023-01-01" max="2023-12-31" />
            </label>

            <label>
                <span>Is private:</span>
                <input type="checkbox" name="isPrivate" />
            </label>

            <label>
                <span>Banner Image:</span>
                <input type="file" name="bannerImage" accept=".jpg, .jpeg, .png" />
            </label>

            <button>Send</button>

        </form>

    </div>;
};

export { EventForm };
