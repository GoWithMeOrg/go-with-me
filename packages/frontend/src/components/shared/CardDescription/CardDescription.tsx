import { Title } from '@/components/shared/Title';
import Link from 'next/link';

import { CardDescriptionProps } from './types';

import classes from './CardDescription.module.css';

export const CardDescription = ({ id, name, description }: CardDescriptionProps) => (
    <div className={classes.wrapper}>
        <Link href={`/events/${id}`} className={classes.link}>
            <Title tag="h3" title={name} className={classes.title} />
        </Link>

        <p className={classes.description}>{description}</p>
    </div>
);
