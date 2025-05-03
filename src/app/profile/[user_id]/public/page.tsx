"use client";

import { useSession } from "next-auth/react";

import { GET_USER_BY_ID } from "@/app/api/graphql/queries/user";
import { useQuery } from "@apollo/client";
import { Badges } from "@/components/shared/Badges";
import { ButtonBack } from "@/components/shared/ButtonBack";
import Marker from "@/assets/icons/marker.svg";
import Envelope from "@/assets/icons/envelope.svg";

import { Avatar } from "@/components/shared/Avatar";
import { Title } from "@/components/shared/Title";
import { Span } from "@/components/shared/Span";
import { ButtonLink } from "@/components/shared/ButtonLink";

import classes from "./page.module.css";
import { Sizes } from "@/components/shared/Badges/Badges";
import { Description } from "@/components/shared/Description";

const PublicProfile = () => {
    const { data: session } = useSession();
    const user_id = session?.user.id;

    const { data: userData, refetch } = useQuery(GET_USER_BY_ID, { variables: { userId: user_id } });

    console.log(userData?.user?.types);
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
                                    <div className={classes.info}>
                                        <Marker style={{ color: "#575B75", marginRight: "0.75rem" }} />
                                        {userData?.user?.location?.properties.address.split(",")[0]}
                                    </div>

                                    <div className={classes.info}>
                                        <Envelope style={{ marginRight: "0.75rem" }} />
                                        <a href={`mailto:${userData?.user?.email}`} className={classes.mail}>
                                            {userData?.user?.email}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.links}>
                                <ButtonLink href={`/profile/${user_id}/private`} text={"Edit"} width="8.31rem" />
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
                                    <div>0</div>
                                    <span className={classes.attendedText}>attended events</span>
                                </div>

                                <div className={classes.attended}>
                                    <div>0</div>
                                    <span className={classes.attendedText}>organized events</span>
                                </div>
                            </div>

                            {userData?.user?.types && <Badges badges={userData?.user?.types} size={Sizes.SMALL} />}

                            <Span title={userData?.user?.description} className={classes.description} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PublicProfile;
