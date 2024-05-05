import { FC } from "react";
import { useQuery, gql } from "@apollo/client";
import type { IEvent } from "@/database/models/Event";

import classes from "./PopularEventsList.module.css";
import Arrow from "@/assets/icons/arrow.svg";
import Promo from "@/assets/icons/promo.svg";
import CreateEvent from "@/assets/icons/createEvent.svg";
import CreatePrivateEvent from "@/assets/icons/createPrivateEvent.svg";
import ExploreEvents from "@/assets/icons/exploreEvents.svg";
import PlanAdventure from "@/assets/icons/planAdventure.svg";
import { CardWork } from "../CardWork";
import { CardEvent } from "../CardEvent";
import { CreateAndInvite } from "../CreateAndInvite";
import Link from "next/link";

type EventListProps = {
    events?: IEvent[];
};

const GET_EVENTS = gql`
    query GetEvents {
        events {
            _id
            organizer {
                _id
                name
                email
                image
            }

            name
            description
            startDate
            endDate
            time
            location {
                type
                coordinates
                properties {
                    address
                }
            }
        }
    }
`;

export const PopularEventList: FC<EventListProps> = () => {
    const { loading, error, data } = useQuery(GET_EVENTS);

    console.log(data);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <div className={classes.container}>
            <div className={classes.promo}>
                <div className={classes.promoDescription}>
                    <h1 className={classes.promoTitle}>CRAFT YOUR ADVENTURE HERE</h1>
                    <p className={classes.promoDescription}>
                        Craft your trips and events effortlessly. Whether you&#39;re planning a&nbsp;weekend getaway
                        with&nbsp;friends, organizing a&nbsp;cultural exploration, arranging a&nbsp;concert,
                        coordinating a&nbsp;conference, or&nbsp;hosting a&nbsp;casual meeting, we&#39;re here
                        to&nbsp;help you every step of&nbsp;the way. Join us today and unlock a&nbsp;world
                        of&nbsp;endless possibilities. Start crafting your adventure now!
                    </p>
                    <div className={classes.arrow}>
                        <div>Join</div>
                        <Arrow style={{ marginLeft: "0.7rem" }} />
                    </div>
                </div>

                <div className={classes.promoPicture}>
                    <Promo />
                </div>
            </div>
            <div className={classes.cardsEvents}>
                <h2 className={classes.cardsEventsTitle}>Popular Event List</h2>
                <div className={classes.cardsEventsList}>
                    {data.events.map(({ _id, description, name, startDate, location, time }: IEvent) => (
                        <CardEvent
                            key={_id}
                            id={_id}
                            name={name}
                            description={description}
                            coord={location.coordinates}
                            startDate={startDate}
                            time={time}
                        />
                    ))}
                </div>
                <div className={classes.arrowEvents}>
                    <div className={classes.titleArrow}>MORE EVENTS</div>
                    <Arrow />
                </div>
            </div>

            <div className={classes.cardsWork}>
                <div className={classes.cardsWorkTitleWrapper}>
                    <h2 className={classes.cardsWorkTitle}>How IT Works</h2>
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
                                international expeditions, explore destinations, create itineraries, and&nbsp;invite
                                friends to&nbsp;join. Seamlessly collaborate with&nbsp;travel companions by&nbsp;sharing
                                trip details and&nbsp;coordinating activities.
                            </p>
                        }
                        picture={<PlanAdventure />}
                    />
                    <CardWork
                        title={"Explore awesome events near you"}
                        description={
                            <p>
                                Clients can discover exciting events near their location. Whether it&#39;s concerts,
                                workshops, or&nbsp;community events, browse, RSVP, and&nbsp;join the&nbsp;fun. Stay
                                informed about upcoming events with&nbsp;personalized recommendations
                                and&nbsp;notifications based on&nbsp;your interests.
                            </p>
                        }
                        picture={<ExploreEvents />}
                    />
                </div>
                <CreateAndInvite />
            </div>
        </div>
    );
};

export default PopularEventList;
