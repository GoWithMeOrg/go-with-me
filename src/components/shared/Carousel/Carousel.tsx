import classes from "./Carousel.module.css";

export const Carousel = (props: any) => {
    const { children } = props;
    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.contetnWrapper}>
                    <div className={classes.content}>{children}</div>
                </div>
            </div>
        </div>
    );
};
