"use client";

import { FC } from "react";
import Link from "next/link";
import { useQuery, gql, useMutation } from "@apollo/client";

import { formatDate } from "@/utils/formatDate";
import type { IEvent } from "@/database/models/Event";

import classes from "./PopularEventsList.module.css";
import { Geocoding } from "../GoogleMap";
import Image from "next/image";
import profile from "../../assets/images/profile.png";
import { MarkerIcon } from "../Marker";
import dayjs from "dayjs";
import { PromoIcon } from "../PromoIcon";
import { ArrowIcon } from "../ArrowIcon";

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
            isPrivate
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

const DELETE_EVENT_MUTATION = gql`
    mutation DeleteEvent($id: ID!) {
        deleteEvent(id: $id) {
            _id
        }
    }
`;

export const PopularEventList: FC<EventListProps> = () => {
    const { loading, error, data } = useQuery(GET_EVENTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <div className={classes.component}>
            <div className={classes.promo}>
                <div className={classes.promoDescription}>
                    <h1 className={classes.promoTitle}>Craft Your Adventure Here</h1>
                    <p className={classes.promoDescription}>
                        Craft your trips and events effortlessly. Whether you&#39;re planning a weekend getaway with
                        friends, organizing a cultural exploration, arranging a concert, coordinating a conference, or
                        hosting a casual meeting, we&#39;re here to help you every step of the way. Join us today and
                        unlock a world of endless possibilities. Start crafting your adventure now!
                    </p>

                    <div className={classes.arrow}>
                        <div>JOIN</div>
                        <ArrowIcon />
                    </div>
                </div>

                <div className={classes.promoPicture}>
                    <PromoIcon />
                </div>
            </div>

            <div className={classes.cardList}>
                <h2 className={classes.title}>Popular Event List</h2>
                <ul className={classes.list}>
                    {data.events.map(({ _id, description, name, startDate, location }: IEvent) => (
                        <li key={_id} className={classes.card}>
                            <Link className={classes.edit} href={`/events/${_id}`}>
                                <Image src={profile} alt="img" />

                                <div className={classes.location}>
                                    <MarkerIcon color={"#575B75"} />
                                    <div className={classes.geocoding}>
                                        <Geocoding coordinates={location.coordinates} />
                                    </div>
                                </div>

                                <div className={classes.date}>
                                    <input type="checkbox" checked className={classes.checkboxDate} />
                                    <div>{dayjs(startDate).format("DD.MM.YY")}</div>
                                </div>

                                <div className={classes.name}>{name}</div>

                                <div className={classes.description}>{description}</div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PopularEventList;
