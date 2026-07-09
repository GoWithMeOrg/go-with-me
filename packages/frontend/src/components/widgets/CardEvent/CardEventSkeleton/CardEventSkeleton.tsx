import classes from './CardEventSkeleton.module.css';

export const CardEventSkeleton = () => {
    return (
        <div className={classes.card} aria-busy="true" aria-live="polite">
            <div className={`${classes.shimmer} ${classes.image}`} />

            <div className={classes.details}>
                <div className={classes.location}>
                    <span className={`${classes.shimmer} ${classes.locationIcon}`} />
                    <span className={`${classes.shimmer} ${classes.locationText}`} />
                </div>

                <div className={classes.dateTime}>
                    <span className={`${classes.shimmer} ${classes.dateTimeIcon}`} />
                    <span className={`${classes.shimmer} ${classes.dateText}`} />
                    <span className={`${classes.shimmer} ${classes.timeText}`} />
                </div>
            </div>

            <div className={classes.description}>
                <span className={`${classes.shimmer} ${classes.title}`} />
                <span className={`${classes.shimmer} ${classes.descriptionLine}`} />
                <span className={`${classes.shimmer} ${classes.descriptionLineWide}`} />
                <span className={`${classes.shimmer} ${classes.descriptionLine}`} />
            </div>
        </div>
    );
};

export default CardEventSkeleton;
