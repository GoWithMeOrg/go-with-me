import classes from "./EventForm.module.css";

const EventForm = () => {
    return <div className={classes.component}>
        <form>
            <h2>Registration form</h2>
            <label>
                <span>Name</span>
                <input name="name" type="text" />
            </label>
            <label>
                <span>Email</span>
                <input name="email" type="email" />
            </label>
            <label>
                <span>Password</span>
                <input name="password" type="password" />
            </label>
            <button>send</button>
        </form>
    </div>;
};

export { EventForm };
