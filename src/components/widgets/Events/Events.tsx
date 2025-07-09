import { useState } from "react";

import { useNotifications } from "../Notifications/hooks";
import { useFilterEvents } from "./hooks/useFilterEvents";

import { IInvitation, TabType } from "./types/events";

import { Invitation } from "@/components/widgets/Invitation";
import CardEvent, { SizeCard } from "@/components/widgets/CardEvent/CardEvent";
import { NavbarTabs } from "@/components/widgets/Navbar/models";

import { Title } from "@/components/shared/Title";
import { FilteredList } from "@/components/shared/FilteredList";
import { Button } from "@/components/shared/Button";
import { NavigationTabs } from "@/components/shared/NavTabs";
import { Loader } from "@/components/shared/Loader";

import classes from "./Events.module.css";

interface EventsProps {
    onTabClick: (tab: NavbarTabs) => void;
}

export function Events({ onTabClick }: EventsProps) {
    const [activeFilter, setActiveFilter] = useState<TabType>(TabType.UPCOMING);

    const { data, error, loading } = useFilterEvents({ activeFilter });

    const { dataInvations } = useNotifications();

    const hasData = Boolean(dataInvations?.length);

    const lastInvitation: IInvitation = dataInvations?.at(-1);

    const TABS = [TabType.UPCOMING, TabType.WATCHLIST, TabType.DECLINED, TabType.PAST, TabType.ORGANIZED];

    return (
        <div className={classes.eventsWrapper}>
            {hasData && (
                <div className={classes.eventsList}>
                    <Button
                        resetDefaultStyles={true}
                        className={classes.btnAllNotifications}
                        onClick={() => onTabClick(NavbarTabs.NOTIFICATIONS)}
                    >
                        All notifications
                    </Button>
                    <Invitation
                        key={lastInvitation.invitation.id}
                        invitation_id={lastInvitation.invitation.id}
                        receiver_id={lastInvitation.user._id}
                        status={lastInvitation.status}
                        event_id={lastInvitation.invitation.event._id}
                        image={lastInvitation.invitation.event.image}
                        eventName={lastInvitation.invitation.event?.name}
                        coordinates={lastInvitation.invitation.event.location.coordinates}
                        startDate={lastInvitation.invitation.event.startDate}
                        time={lastInvitation.invitation.event.time}
                        organizerName={lastInvitation.invitation.event.organizer.name}
                        senderName={lastInvitation.invitation.sender.name}
                        organizer_id={lastInvitation.invitation.event.organizer._id}
                        sender_id={lastInvitation.invitation.sender._id}
                    />
                </div>
            )}
            <Title tag={"h3"} title="Events" />
            <div className={classes.line}></div>
            <NavigationTabs tabs={TABS} activeTab={activeFilter} onTabChange={setActiveFilter} />
            <FilteredList className={classes.filteredList}>
                {loading ? (
                    <Loader num={2} />
                ) : error ? (
                    <div className={classes.errorMessage}>{error.message}</div>
                ) : !data || data.length === 0 ? (
                    <div className={classes.noEventsMessage}>По вашему запросу ничего не найдено</div>
                ) : (
                    data.map(({ _id, description, name, startDate, location, time, image }) => (
                        <CardEvent
                            key={_id}
                            id={_id}
                            name={name}
                            description={description}
                            coord={[location.coordinates[0], location.coordinates[1]]}
                            startDate={startDate}
                            time={time}
                            image={image}
                            size={SizeCard.ML}
                        />
                    ))
                )}
            </FilteredList>
        </div>
    );
}
