import React from "react";
import Link from "next/link";

import { CardWork } from "@/components/widgets/CardWork";
import { Title } from "@/components/shared/Title";

import CreateEvent from "@/assets/icons/createEvent.svg";
import CreatePrivateEvent from "@/assets/icons/createPrivateEvent.svg";
import PlanAdventure from "@/assets/icons/planAdventure.svg";
import ExploreEvents from "@/assets/icons/exploreEvents.svg";

import classes from "./HowITWorks.module.css";

export const HowITWorks = () => {
    return (
        <section className={classes.cardsWorkWrapper}>
            <div className={classes.cardsWorkTitleWrapper}>
                <Title title={"How IT Works"} tag={"h2"} />
                <Link className={classes.cardsWorkLink} href="/faq">
                    FAQ
                </Link>
            </div>

            <div className={classes.cardsWorkList}>
                <CardWork
                    title={"Create an awesome event for everyone"}
                    description={
                        <p>
                            Organizers can easily create public events that are&nbsp;open to&nbsp;everyone. From
                            concerts to&nbsp;community gatherings, share your event with&nbsp;the&nbsp;world. Engage
                            attendees with&nbsp;interactive features like event discussions and&nbsp;photo sharing.
                        </p>
                    }
                    picture={<CreateEvent />}
                />
                <CardWork
                    title={"Create a private event for your close ones"}
                    description={
                        <p>
                            Organizers can create private events for&nbsp;close friends, family, or&nbsp;select
                            invitees. Whether it&#39;s&nbsp;a&nbsp;birthday celebration or&nbsp;a&nbsp;private
                            gathering, keep your event exclusive. Control access to&nbsp;your event with&nbsp;
                            customizable invitation options and&nbsp;guest list management.
                        </p>
                    }
                    picture={<CreatePrivateEvent />}
                />
                <CardWork
                    title={"Plan your next adventure"}
                    description={
                        <p>
                            Clients can plan their next adventure effortlessly. From weekend getaways to&nbsp;
                            international expeditions, explore destinations, create itineraries, and&nbsp;invite friends
                            to&nbsp;join. Seamlessly collaborate with&nbsp;travel companions by&nbsp;sharing trip
                            details and&nbsp;coordinating activities.
                        </p>
                    }
                    picture={<PlanAdventure />}
                />
                <CardWork
                    title={"Explore awesome events near you"}
                    description={
                        <p>
                            Clients can discover exciting events near their location. Whether it&#39;s concerts,
                            workshops, or&nbsp;community events, browse, RSVP, and&nbsp;join the&nbsp;fun. Stay informed
                            about upcoming events with&nbsp;personalized recommendations and&nbsp;notifications based
                            on&nbsp;your interests.
                        </p>
                    }
                    picture={<ExploreEvents />}
                />
            </div>
        </section>
    );
};

export default HowITWorks;
