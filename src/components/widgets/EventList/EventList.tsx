"use client";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery, gql, useMutation } from "@apollo/client";

import { formatDate } from "@/utils/formatDate";
import type { IEvent } from "@/database/models/Event";
import { Geocoding } from "@/components/widgets/GoogleMap";

import { useUploadFile } from "../UploadFile/hooks";

import classes from "./EventList.module.css";

type EventListProps = {
    events?: IEvent[];
};

const GET_EVENTS = gql`
    query GetEvents($limit: Int!, $offset: Int!, $sort: String!) {
        events(limit: $limit, offset: $offset, sort: $sort) {
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
                coordinates
                properties {
                    address
                }
            }
            status
            categories
            tags
            image
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

const EventList: FC<EventListProps> = () => {
    const { loading, error, data, refetch } = useQuery(GET_EVENTS, {
        variables: {
            limit: 0,
            offset: 0,
            sort: "startDate",
        },
    });
    const [deleteEventMutation] = useMutation(DELETE_EVENT_MUTATION);
    const { getDeleteFile } = useUploadFile({});

    console.log(data);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    const handleDelete = async (eventId: string) => {
        try {
            await deleteEventMutation({
                variables: { id: eventId },
            });

            //Находим картинку события
            const imageUrl = data.events.find((event: any) => event._id === eventId).image;
            //удаляем картинку
            await getDeleteFile(imageUrl);
            await refetch();
        } catch (error) {
            console.error("Error deleting event: ", error);
        }
    };

    return (
        <div className={classes.component}>
            <h3>Event List</h3>
            <ul>
                {data.events.map(({ _id, description, name, startDate, endDate, location, image }: IEvent) => (
                    <li key={_id} className={classes.item}>
                        <h3>
                            <Link className={classes.edit} href={`/events/${_id}`}>
                                {name}
                            </Link>
                        </h3>
                        {image && <Image src={image} width={100} height={100} alt={name} priority />}
                        <div className={classes.item}>{description}</div>

                        <div className={classes.location}>
                            <span>Адрес:</span>
                            <Geocoding coordinates={[location.coordinates[1], location.coordinates[0]]} />
                        </div>

                        <div className={classes.controls}>
                            <Link href={`/events/${_id}/edit`}>Редактировать</Link>
                            <button
                                className={classes.delete}
                                onClick={() => {
                                    confirm("Delete?") ? handleDelete(_id) : null;
                                }}
                            >
                                Удалить
                            </button>
                        </div>
                        <div className={classes.dates}>
                            {startDate && (
                                <div>
                                    Start Date:
                                    {formatDate(startDate, "dd LLLL yyyy")}
                                </div>
                            )}
                            {endDate && (
                                <div>
                                    endDate:
                                    {formatDate(endDate, "dd LLLL yyyy")}
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export { EventList };
