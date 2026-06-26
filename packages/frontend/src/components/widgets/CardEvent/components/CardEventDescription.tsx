import Link from 'next/link';

import classes from '../CardEvent.module.css';

interface CardEventDescriptionProps {
    id: string;
    name: string;
    description: string;
}

export const CardEventDescription = ({ id, name, description }: CardEventDescriptionProps) => (
    <div className={classes.descriptionWrapper}>
        <Link href={`/events/${id}`} className={classes.titleLink}>
            <h3 className={classes.title}>{name}</h3>
        </Link>

        <p className={classes.description}>{description}</p>
    </div>
);
