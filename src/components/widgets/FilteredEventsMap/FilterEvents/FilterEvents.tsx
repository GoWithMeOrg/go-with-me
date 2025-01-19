import { IEvent } from "@/database/models/Event";
import { CardEvent } from "@/components/widgets/CardEvent";
import { SizeCard } from "@/components/widgets/CardEvent/CardEvent";

import classes from "./FilterEvents.module.css";
import { FC, useEffect } from "react";

interface FilterEventsProps {
    data: any;
    sizeCard: SizeCard;
}

export const FilterEvents: FC<FilterEventsProps> = ({ data, sizeCard }) => {
    useEffect(() => {
        if (data?.length === 0) {
            console.log("По вашему запросу ничего не найдено");
        }
    }, [data]);

    return (
        <div className={classes.filteredEvents}>
            {data?.length === 0 ? (
                <div className={classes.noEventsMessage}>По вашему запросу ничего не найдено</div>
            ) : (
                data?.map(({ _id, description, name, startDate, location, time, image }: IEvent) => (
                    <CardEvent
                        key={_id}
                        id={_id}
                        name={name}
                        description={description}
                        coord={[location.coordinates[0], location.coordinates[1]]}
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
