import { FC } from "react";

import { IEvent } from "@/database/models/Event";
import { CardEvent } from "@/components/widgets/CardEvent";
import { SizeCard } from "@/components/widgets/CardEvent/CardEvent";

import classes from "./FilteredEvents.module.css";
import { Backdrop } from "../../Backdrop";

interface FilteredEventsProps {
    data: any;
    sizeCard: SizeCard;
}

export const FilteredEvents: FC<FilteredEventsProps> = ({ data, sizeCard }) => {
    if (data?.length === 0) return <p>По вашему запросу ничего не найдено</p>;

    return (
        <Backdrop>
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
        </Backdrop>
    );
};

export default FilteredEvents;
