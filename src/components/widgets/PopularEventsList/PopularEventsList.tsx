import { FC } from "react";
import { useQuery, gql } from "@apollo/client";
import type { IEvent } from "@/database/models/Event";
import { Title } from "@/components/shared/Title";

import classes from "./PopularEventsList.module.css";
import ArrowCircle from "@/assets/icons/arrowCircle.svg";
import Promo from "@/assets/icons/promo.svg";
import CreateEvent from "@/assets/icons/createEvent.svg";
import CreatePrivateEvent from "@/assets/icons/createPrivateEvent.svg";
import ExploreEvents from "@/assets/icons/exploreEvents.svg";
import PlanAdventure from "@/assets/icons/planAdventure.svg";
import { CardWork } from "@/components/widgets/CardWork";
import { CardEvent } from "@/components/widgets/CardEvent";
import { CreateAndInvite } from "@/components/widgets/CreateAndInvite";
import Link from "next/link";
import { Button } from "@/components/shared/Button";
import { Loader } from "@/components/shared/Loader";

export type EventListProps = {
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
            image
        }
    }
`;

export const PopularEventList: FC<EventListProps> = () => {
    const { loading, error, data } = useQuery(GET_EVENTS);

    if (loading) return <Loader />;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <div className={classes.container}>
            <div className={classes.promo}>
                <div className={classes.promoDescription}>
                    <Title title={"CRAFT YOUR ADVENTURE HERE"} tag={"h1"} />
                    <p className={classes.promoDescription}>
                        Craft your trips and events effortlessly. Whether you&#39;re planning a&nbsp;weekend getaway
                        with&nbsp;friends, organizing a&nbsp;cultural exploration, arranging a&nbsp;concert,
                        coordinating a&nbsp;conference, or&nbsp;hosting a&nbsp;casual meeting, we&#39;re here
                        to&nbsp;help you every step of&nbsp;the way. Join us today and unlock a&nbsp;world
                        of&nbsp;endless possibilities. Start crafting your adventure now!
                    </p>
                    <Button text={"Join"} className={classes.promoButton} resetDefaultStyles={true}>
                        <ArrowCircle style={{ marginLeft: "0.7rem" }} />
                    </Button>
                </div>

                <div className={classes.promoPicture}>
                    <Promo />
                </div>
            </div>
            <div className={classes.cardsEvents}>
                <Title title={"Popular Event List"} className={classes.cardsEventsTitle} tag={"h2"} />

                <div className={classes.cardsEventsList}>
                    {data.events.map(({ _id, description, name, startDate, location, time, image }: IEvent) => (
                        <CardEvent
                            key={_id}
                            id={_id}
                            name={name}
                            description={description}
                            coord={[location.coordinates[1], location.coordinates[0]]}
                            startDate={startDate}
                            time={time}
                            image={image}
                        />
                    ))}
                </div>

                <Button className={classes.eventsButton} text={"More Events"} resetDefaultStyles={true}>
                    <ArrowCircle style={{ marginRight: "1.25rem", marginLeft: "1rem" }} />
                </Button>
            </div>

            <div className={classes.cardsWork}>
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
