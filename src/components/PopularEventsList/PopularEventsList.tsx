"use client";

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
            # isPrivate
            startDate
            endDate
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <div className={classes.container}>
            <div className={classes.promo}>
                <div className={classes.promoDescription}>
                    <h1 className={classes.promoTitle}>CRAFT YOUR ADVENTURE HERE</h1>
                    <p className={classes.promoDescription}>
                        Craft your trips and events effortlessly. Whether you&#39;re planning a weekend getaway with
                        friends, organizing a cultural exploration, arranging a concert, coordinating a conference, or
                        hosting a casual meeting, we&#39;re here to help you every step of the way. Join us today and
                        unlock a world of endless possibilities. Start crafting your adventure now!
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
                    {data.events.map(({ _id, description, name, startDate, location }: IEvent) => (
                        <CardEvent
                            key={_id}
                            id={_id}
                            name={name}
                            description={description}
                            coord={location.coordinates}
                            startDate={startDate}
                        />
                    ))}
                </div>
                <div className={classes.arrow}>
                    <div className={classes.titleArrow}>MORE EVENTS</div>
                    <Arrow />
                </div>
            </div>

            <div className={classes.cardsWork}>
                <div className={classes.cardsEventsTitle}>
                    <h2 className={classes.cardsEventsTitle}>How IT Works</h2>
                </div>

                <div className={classes.cardsWorkList}>
                    <CardWork
                        title={"Create an awesome event for everyone"}
                        description={
                            "Organizers can easily create public events that are open to everyone. From concerts to community gatherings, share your event with the world. Engage attendees with interactive features like event discussions and photo sharing."
                        }
                        picture={<CreateEvent />}
                    />
                    <CardWork
                        title={"Create a private event for your close ones"}
                        description={
                            "Organizers can create private events for close friends, family, or select invitees. Whether it's a birthday celebration or a private gathering, keep your event exclusive. Control access to your event with customizable invitation options and guest list management."
                        }
                        picture={<CreatePrivateEvent />}
                    />
                    <CardWork
                        title={"Plan your next adventure"}
                        description={
                            "Clients can plan their next adventure effortlessly. From weekend getaways to international expeditions, explore destinations, create itineraries, and invite friends to join. Seamlessly collaborate with travel companions by sharing trip details and coordinating activities."
                        }
                        picture={<PlanAdventure />}
                    />
                    <CardWork
                        title={"Explore awesome events near you"}
                        description={
                            "Clients can discover exciting events near their location. Whether it's concerts, workshops, or community events, browse, RSVP, and join the fun. Stay informed about upcoming events with personalized recommendations and notifications based on your interests."
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
