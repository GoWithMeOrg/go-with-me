"use client";

import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

import { EventList } from "@/components/widgets/EventList/EventList";

import classes from "./page.module.css";
import { Title } from "@/components/shared/Title";
import { Button } from "@/components/shared/Button";
import { Slide } from "@/components/shared/Slider/Slide";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import Arrow from "@/assets/icons/arrow.svg";
import dayjs from "dayjs";
import Marker from "@/assets/icons/marker.svg";
import Checkbox from "@/assets/icons/checkbox.svg";
import { Geocoding } from "@/components/widgets/GoogleMap/Geocoding";
import { Slider } from "@/components/shared/Slider";

// const GET_EVENTS = gql`
//     query GetEvents($limit: Int!, $offset: Int!, $sort: String!) {
//         events(limit: $limit, offset: $offset, sort: $sort) {
//             _id
//             organizer {
//                 _id
//             }
//             name
//             description
//             startDate
//             time
//             location {
//                 coordinates
//             }
//             image
//         }
//     }
// `;

const EventListPage: NextPage = () => {
    // const { data, error, loading, refetch } = useQuery(GET_EVENTS, {
    //     variables: {
    //         limit: 9,
    //         offset: 9,
    //         sort: "startDate",
    //     },
    // });

    // const [currentIndex, setCurrentIndex] = useState(0);

    // const nextSlide = () => {
    //     setCurrentIndex((prevIndex) => (prevIndex === data?.events.length - 1 ? 0 : prevIndex + 1));
    //     console.log(currentIndex);
    // };

    //console.log(data?.events);

    return (
        // <div className={classes.eventListPage}>
        //     <Title tag={"h1"} title="Join the adventure" className={classes.title} />
        //     <div className={classes.sliderContainer}>
        //         <div className={classes.sliderHeader}>
        //             <Title tag={"h3"} title="Recommended events" />
        //             <Button resetDefaultStyles={true} className={classes.sliderButton}>
        //                 HIDE
        //             </Button>
        //         </div>
        //         <div className={classes.sliderWrapper}>
        //             {/* {data?.events.map((event: any, index: number) => (
        //                 <Slide
        //                     key={event._id}
        //                     name={event.name}
        //                     image={event.image}
        //                     coord={event.location.coordinates}
        //                     startDate={event.startDate}
        //                     time={event.time}
        //                 />
        //             ))} */}

        //             {data?.events.map((event: any, index: number) => (
        //                 <div className={classes.slide} key={event.id}>
        //                     {event.image && (
        //                         <Image src={event.image || ""} alt={"img"} width={580} height={408} priority />
        //                     )}

        //                     <div className={classes.slideContent}>
        //                         <Title tag={"h3"} title={event.name} className={classes.slideTitle} />

        //                         <div className={classes.details}>
        //                             <div>
        //                                 <Marker
        //                                     style={{
        //                                         marginRight: "0.75rem",
        //                                         fill: "#e3ef41",
        //                                         transform: "scale(0.94)",
        //                                     }}
        //                                 />
        //                                 {event.location.coordinates && (
        //                                     <Geocoding coordinates={event.location.coordinates} />
        //                                 )}
        //                             </div>

        //                             <div>
        //                                 <Checkbox
        //                                     style={{ marginRight: "0.75rem", fill: "#e3ef41", transform: "scale(0.8)" }}
        //                                 />
        //                                 {event.startDate && dayjs(event.startDate).format("DD.MM.YYYY")}{" "}
        //                                 {event.time && `| ${event.time}`}
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             ))}
        //         </div>
        //         <Button resetDefaultStyles={true} className={classes.button} onClick={nextSlide}>
        //             <Arrow style={{ rotate: "180deg" }} />
        //         </Button>
        //     </div>
        //     {/* <h1>Event List Page</h1>
        //     <div>
        //         <Link href="/events/new">Create New Event</Link>
        //     </div>
        //     <EventList /> */}
        // </div>
        <div className={classes.eventListPage}>
            <Title tag={"h1"} title="Join the adventure" className={classes.title} />
            <Slider />
        </div>
    );
};

export default EventListPage;
