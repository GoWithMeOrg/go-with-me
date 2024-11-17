import React, { FC } from "react";

import { Title } from "../Title";
import { CardEvent } from "@/components/widgets/CardEvent";
import { IEvent } from "@/database/models/Event";
import { Button } from "../Button";

import ArrowCircle from "@/assets/icons/arrowCircle.svg";

import { Loader } from "../Loader";
import { SizeCard } from "@/components/widgets/CardEvent/CardEvent";
import { useEventListHome } from "./hook/useEventListHome";

import classes from "./EventListHome.module.css";

//         events {
//             _id
//             organizer {
//                 _id
//                 name
//                 email
//                 image
//             }

//             name
//             description
//             startDate
//             endDate
//             time
//             location {
//                 type
//                 coordinates
//                 properties {
//                     address
//                 }
//             }
//             image
//         }
//     }
// `;

interface EventListHomeProps {
    sizeCard: SizeCard;
}

export const EventListHome: FC<EventListHomeProps> = ({ sizeCard }) => {
    const { data, error, loading, refetch } = useEventListHome();

    refetch();
    if (loading) return <Loader />;
    if (error) return <p>Error : {error.message}</p>;

    console.log("EventListHome: ", data);

    return (
        <section className={classes.cardsEvents}>
            <Title title={"Popular Event List"} className={classes.cardsEventsTitle} tag={"h2"} />

            <div className={classes.cardsEventsList}>
                {data?.events.map(({ _id, description, name, startDate, location, time, image }: IEvent) => (
                    <CardEvent
                        key={_id}
                        id={_id}
                        name={name}
                        description={description}
                        coord={[location.coordinates[1], location.coordinates[0]]}
                        startDate={startDate}
                        time={time}
                        image={image}
                        size={sizeCard}
                    />
                ))}
            </div>

            <Button className={classes.eventsButton} resetDefaultStyles={true}>
                More Events
                <ArrowCircle style={{ marginRight: "1.25rem", marginLeft: "1rem" }} />
            </Button>
        </section>
    );
};

export default EventListHome;
