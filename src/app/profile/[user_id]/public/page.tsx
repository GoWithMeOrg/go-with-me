"use client";

import { NextPage } from "next";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useQuery } from "@apollo/client";

import { GET_USER_BY_ID } from "@/app/api/graphql/queries/user";
import { GET_ORGANIZER_EVENTS } from "@/app/api/graphql/queries/events";

import { Avatar } from "@/components/shared/Avatar";
import { Title } from "@/components/shared/Title";
import { Span } from "@/components/shared/Span";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { Sizes } from "@/components/shared/Badges/Badges";
import { Badges } from "@/components/shared/Badges";
import { ButtonBack } from "@/components/shared/ButtonBack";
import { Carousel } from "@/components/shared/Carousel";

import Marker from "@/assets/icons/marker.svg";
import Envelope from "@/assets/icons/envelope.svg";

import { IEvent } from "@/database/models/Event";

import { CardEvent } from "@/components/widgets/CardEvent";
import { SizeCard } from "@/components/widgets/CardEvent/CardEvent";

import classes from "./page.module.css";

const PublicProfile: NextPage = () => {
    const { data: session } = useSession();
    const user_id = session?.user.id;

    const params = useParams();
    console.log(params.user_id);

    // Подставляется session_id, пользователь видит свою публичную страницу, что если я просто посетитель? Как перейти в аккаунт другого пользователя?
    const { data: userData, refetch } = useQuery(GET_USER_BY_ID, { variables: { userId: user_id } });
    const { data: eventsData, refetch: eventsDataRefetch } = useQuery(GET_ORGANIZER_EVENTS, {
        variables: { organizerId: user_id },
    });

    //TO DO: Будет ли какая-то сортивка организованных событий в слайдере? К примеру пропускаем состоявшиеся события?
    //TO DO: Ближайшие события организатора или в которых участвует организатор? Если ближайшие события организатора, то такую сортировку можно сделать в первом слайдере. Что показывать в слайдере будет настраиваться в настройках приватности.

    return (
        <>
            {userData?.user && (
                <div className={classes.public}>
                    <ButtonBack />
                    <div className={classes.profile}>
                        <div className={classes.wrapper}>
                            <div className={classes.avatar}>
                                <div className={classes.image}>
                                    <Avatar name={userData?.user.name} image={userData?.user.image} scale={2.5} />
                                </div>

                                <div className={classes.user}>
                                    <Title tag={"h3"} style={{ whiteSpace: "pre-wrap", marginBottom: "2rem" }}>
                                        {userData?.user?.name.replace(" ", "\n")}
                                    </Title>

                                    {userData?.user?.location?.properties.address && (
                                        <div className={classes.info}>
                                            <Marker style={{ color: "#575B75", marginRight: "0.75rem" }} />
                                            {userData?.user?.location?.properties.address.split(",")[0]}
                                        </div>
                                    )}

                                    <div className={classes.info}>
                                        <Envelope style={{ marginRight: "0.75rem" }} />
                                        <a href={`mailto:${userData?.user?.email}`} className={classes.mail}>
                                            {userData?.user?.email}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.links}>
                                <ButtonLink
                                    href={`/profile/${user_id}/private`}
                                    text={"To my account"}
                                    width="11.81rem"
                                />
                            </div>
                        </div>

                        <div className={classes.details}>
                            <div className={classes.counters}>
                                <div className={classes.attended}>
                                    <div>{eventsData?.allOrganizerEvents.length}</div>
                                    <span className={classes.attendedText}>organized events</span>
                                </div>
                            </div>

                            {userData?.user?.types && <Badges badges={userData?.user?.types} size={Sizes.SMALL} />}

                            <Span title={userData?.user?.description} className={classes.description} />
                        </div>
                    </div>

                    {eventsData?.allOrganizerEvents && (
                        <Carousel title="Organized events" hideButton marginBottom="3.88rem">
                            {eventsData?.allOrganizerEvents.map((slide: IEvent) => (
                                <CardEvent
                                    key={slide._id}
                                    id={slide._id}
                                    name={slide.name}
                                    description={slide.description}
                                    coord={[slide.location.coordinates[0], slide.location.coordinates[1]]}
                                    startDate={slide.startDate}
                                    time={slide.time}
                                    image={slide.image}
                                    size={SizeCard.ML}
                                />
                            ))}
                        </Carousel>
                    )}

                    {eventsData?.allOrganizerEvents && (
                        <Carousel title="Upcoming events" hideButton marginBottom="3.88rem">
                            {eventsData?.allOrganizerEvents.map((slide: IEvent) => (
                                <CardEvent
                                    key={slide._id}
                                    id={slide._id}
                                    name={slide.name}
                                    description={slide.description}
                                    coord={[slide.location.coordinates[0], slide.location.coordinates[1]]}
                                    startDate={slide.startDate}
                                    time={slide.time}
                                    image={slide.image}
                                    size={SizeCard.ML}
                                />
                            ))}
                        </Carousel>
                    )}
                </div>
            )}
        </>
    );
};

export default PublicProfile;
