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

    const invitedEvents = dataInvations?.filter((item: IInvitation) => item.status === "Invited");

    const viewInvitedEvent: IInvitation | undefined = invitedEvents?.[0];

    const TABS = [TabType.UPCOMING, TabType.WATCHLIST, TabType.DECLINED, TabType.PAST, TabType.ORGANIZED];

    let content: React.ReactNode;

    if (loading) {
        content = <Loader num={2} />;
    } else if (error) {
        content = <div className={classes.errorMessage}>{error.message}</div>;
    } else if (!data || data.length === 0) {
        content = <div className={classes.noEventsMessage}>По вашему запросу ничего не найдено</div>;
    } else {
        content = data.map(({ _id, description, name, startDate, location, time, image }) => (
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
        ));
    }

    return (
        <div className={classes.eventsWrapper}>
            {viewInvitedEvent && (
                <div className={classes.eventsList}>
                    <Button
                        resetDefaultStyles={true}
                        className={classes.btnAllNotifications}
                        onClick={() => onTabClick(NavbarTabs.NOTIFICATIONS)}
                    >
                        All notifications
                    </Button>
                    <Invitation
                        key={viewInvitedEvent.invitation.id}
                        invitation_id={viewInvitedEvent.invitation.id}
                        receiver_id={viewInvitedEvent.user._id}
                        status={viewInvitedEvent.status}
                        event_id={viewInvitedEvent.invitation.event._id}
                        image={viewInvitedEvent.invitation.event.image}
                        eventName={viewInvitedEvent.invitation.event?.name}
                        coordinates={viewInvitedEvent.invitation.event.location.coordinates}
                        startDate={viewInvitedEvent.invitation.event.startDate}
                        time={viewInvitedEvent.invitation.event.time}
                        organizerName={viewInvitedEvent.invitation.event.organizer.name}
                        senderName={viewInvitedEvent.invitation.sender.name}
                        organizer_id={viewInvitedEvent.invitation.event.organizer._id}
                        sender_id={viewInvitedEvent.invitation.sender._id}
                    />
                </div>
            )}
            <Title tag={"h3"} title="Events" />
            <div className={classes.line}></div>
            <NavigationTabs tabs={TABS} activeTab={activeFilter} onTabChange={setActiveFilter} />
            <FilteredList className={classes.filteredList}>{content}</FilteredList>
        </div>
    );
}
