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
                <Title title={"Как это Работает"} tag={"h2"} />
                <Link className={classes.cardsWorkLink} href="/faq">
                    FAQ
                </Link>
            </div>

            <div className={classes.cardsWorkList}>
                <CardWork
                    title={"Создайте потрясающее событие для всех"}
                    description={
                        // <p>
                        //     Organizers can easily create public events that are&nbsp;open to&nbsp;everyone. From
                        //     concerts to&nbsp;community gatherings, share your event with&nbsp;the&nbsp;world. Engage
                        //     attendees with&nbsp;interactive features like event discussions and&nbsp;photo sharing.
                        // </p>

                        <p>
                            Организаторы могут легко создавать публичные мероприятия, которые открыты для&nbsp;всех
                            желающих. От концертов до&nbsp;общественных собраний, поделитесь своим&nbsp;событием со всем
                            миром. Привлеките посетителей с помощью интерактивных функций, таких как обсуждение
                            мероприятия и&nbsp;обмен фотографиями.
                        </p>
                    }
                    picture={<CreateEvent />}
                />
                <CardWork
                    title={"Создайте приватное мероприятие для своих близких"}
                    description={
                        // <p>
                        //     Organizers can create private events for&nbsp;close friends, family, or&nbsp;select
                        //     invitees. Whether it&#39;s&nbsp;a&nbsp;birthday celebration or&nbsp;a&nbsp;private
                        //     gathering, keep your event exclusive. Control access to&nbsp;your event with&nbsp;
                        //     customizable invitation options and&nbsp;guest list management.
                        // </p>
                        <p>
                            Организаторы могут создавать частные мероприятия для близких друзей, членов семьи или
                            избранных приглашенных. Будь то&nbsp;празднование дня рождения или частная встреча, сделайте
                            свое мероприятие эксклюзивным. Контролируйте доступ к&nbsp;мероприятию с помощью
                            настраиваемых параметров приглашений и управления списком гостей.
                        </p>
                    }
                    picture={<CreatePrivateEvent />}
                />
                <CardWork
                    title={"Планируйте свои приключения"}
                    description={
                        // <p>
                        //     Clients can plan their next adventure effortlessly. From weekend getaways to&nbsp;
                        //     international expeditions, explore destinations, create itineraries, and&nbsp;invite friends
                        //     to&nbsp;join. Seamlessly collaborate with&nbsp;travel companions by&nbsp;sharing trip
                        //     details and&nbsp;coordinating activities.
                        // </p>

                        <p>
                            Клиенты могут без труда спланировать свое&nbsp;следующее приключение. От поездок
                            на&nbsp;выходные до международных экспедиций. Изучайте направления, создавайте маршруты и
                            приглашайте друзей. Обменивайтесь с&nbsp;попутчиками деталями поездки и&nbsp;координируйте
                            действия.
                        </p>
                    }
                    picture={<PlanAdventure />}
                />
                <CardWork
                    title={"Узнайте о потрясающих событиях поблизости от вас"}
                    description={
                        // <p>
                        //     Clients can discover exciting events near their location. Whether it&#39;s concerts,
                        //     workshops, or&nbsp;community events, browse, RSVP, and&nbsp;join the&nbsp;fun. Stay informed
                        //     about upcoming events with&nbsp;personalized recommendations and&nbsp;notifications based
                        //     on&nbsp;your interests.
                        // </p>
                        <p>
                            Клиенты могут найти интересные мероприятия поблизости от своего местонахождения. Концерты,
                            семинары или общественные мероприятия - просматривайте, регистрируйтесь и присоединяйтесь
                            к&nbsp;веселью. Оставайтесь в курсе предстоящих событий благодаря персональным рекомендациям
                            и уведомлениям, основанным на ваших интересах.
                        </p>
                    }
                    picture={<ExploreEvents />}
                />
            </div>
        </section>
    );
};

export default HowITWorks;
