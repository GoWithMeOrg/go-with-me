import CreateEvent from '@/assets/icons/createEvent.svg';
import CreatePrivateEvent from '@/assets/icons/createPrivateEvent.svg';
import ExploreEvents from '@/assets/icons/exploreEvents.svg';
import PlanAdventure from '@/assets/icons/planAdventure.svg';
import { Title } from '@/components/shared/Title';
import { CardWork } from '@/components/widgets/CardWork';
import Link from 'next/link';

import classes from './HowITWorks.module.css';

const NBSP = '\u00A0';

export const HowITWorks = () => {
    return (
        <section className={classes.cardsWorkWrapper}>
            <div className={classes.cardsWorkTitleWrapper}>
                <Title title={'How it Works'} tag={'h2'} />
                <Link className={classes.cardsWorkLink} href="/faq">
                    FAQ
                </Link>
            </div>

            <ul className={classes.cardsWorkList}>
                <li>
                    <CardWork
                        title={'Create your own trips and events'}
                        description={`Organizers can easily create public events that are${NBSP}open to${NBSP}everyone. From concerts to${NBSP}community gatherings, share your event with${NBSP}the${NBSP}world. Engage attendees with${NBSP}interactive features like event discussions and${NBSP}photo sharing.`}
                        picture={<CreateEvent />}
                    />
                </li>

                <li>
                    <CardWork
                        title="Create private events for exclusive gatherings"
                        description={`Organizers can easily create private events that are${NBSP}exclusive to${NBSP}selected participants. Invite friends, family, or colleagues to${NBSP}private getaways,${NBSP}workshops, or${NBSP}intimate celebrations. Manage attendance with${NBSP}invitation links and${NBSP}secure access controls.`}
                        picture={<CreatePrivateEvent />}
                    />
                </li>

                <li>
                    <CardWork
                        title="Accept invitations and find interesting events"
                        description={`Clients can plan their next adventure effortlessly. From weekend getaways to${NBSP}international expeditions, explore destinations, create itineraries, and${NBSP}invite friends to${NBSP}join. Seamlessly collaborate with${NBSP}travel companions by${NBSP}sharing trip details and${NBSP}coordinating activities.`}
                        picture={<PlanAdventure />}
                    />
                </li>
                <li>
                    <CardWork
                        title="Plan your exciting life"
                        description={`Clients can discover exciting events near their location. Whether it's concerts, workshops, or${NBSP}community events, browse, RSVP, and${NBSP}join the${NBSP}fun. Stay informed about upcoming events with${NBSP}personalized recommendations and${NBSP}notifications based on${NBSP}your interests.`}
                        picture={<ExploreEvents />}
                    />
                </li>
            </ul>
        </section>
    );
};

export default HowITWorks;
