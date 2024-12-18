import { IEvent } from "@/database/models/Event";
import { CardEvent } from "../../CardEvent";
import { SizeCard } from "../../CardEvent/CardEvent";

import classes from "./FilterEvents.module.css";
import { FC, use, useEffect } from "react";

interface FilterEventsProps {
    data: any;
    sizeCard: SizeCard;
}

export const FilterEvents: FC<FilterEventsProps> = ({ data, sizeCard }) => {
    useEffect(() => {
        if (data?.eventsByDate.length === 0) {
            console.log("По вашему запросу ничего не найдено");
        }
    }, [data]);

    return (
        <div className={classes.filteredEvents}>
            {data?.eventsByDate.length === 0 ? (
                <div className={classes.noEventsMessage}>По вашему запросу ничего не найдено</div>
            ) : (
                data?.eventsByDate.map(({ _id, description, name, startDate, location, time, image }: IEvent) => (
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
                ))
            )}
        </div>
    );
};

export default FilterEvents;
