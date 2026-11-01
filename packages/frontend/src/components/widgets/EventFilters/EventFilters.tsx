import React, { useState } from 'react';
import { IEvent } from '@/app/types/Event';
import { categoriesList, interestsList } from '@/components/shared/Dropdown/dropdownLists';
import { FilteredList } from '@/components/shared/FilteredList';
import { Title } from '@/components/shared/Title';
import { Backdrop } from '@/components/widgets/Backdrop';
import CardEvent, { SizeCard } from '@/components/widgets/CardEvent/CardEvent';
import { CreateTag } from '@/components/widgets/CreateTag';
import { Date } from '@/components/widgets/Date';
import { NavbarEvents } from '@/components/widgets/EventFilters/NavbarEvents';
import { useEventList } from '@/components/widgets/EventList/hooks';
import { FilteredEventsLocation } from '@/components/widgets/FilteredEventsLocation';
import { optionsCities } from '@/components/widgets/GoogleMap/OptionsAutocomplete';
import { SelectItems } from '@/components/widgets/SelectItems';

import { GoogleMap } from '../GoogleMap';
import { NavbarEventTabs } from '../Navbar/models';
import { useEventFilters } from './hooks/useEventFilters';

import classes from './EventFilters.module.css';

export const EventFilters = () => {
    const [activeTab, setActiveTab] = useState(NavbarEventTabs.LIST);
    const {
        setSelectedLocation,
        filteredData,
        handleDateChange,
        handleCategoriesChange,
        handleTagsChange,
        handleTypesChange,
        selectedLocation,
    } = useEventFilters();

    const { events, loading } = useEventList({});
    const handleTabClick = (tab: NavbarEventTabs) => {
        setActiveTab(tab);
    };

    return (
        <div className={classes.filteredEvents}>
            <div className={classes.header}>
                <Title tag={'h3'} title="Найти события" />
                <div className={classes.buttons}>
                    <NavbarEvents
                        onTabClick={handleTabClick}
                        activeTab={activeTab}
                        dataAtributes={['list', 'map']}
                        nameAtribute={'data-filtered'}
                    />
                </div>
            </div>
            <div className={classes.line}></div>

            <div className={classes.filters}>
                <Date title={'Дата'} onChange={handleDateChange} />

                <FilteredEventsLocation onChange={setSelectedLocation} options={optionsCities} />

                <SelectItems
                    categoryList={categoriesList}
                    titleCategories={'Категории'}
                    badgesShow={false}
                    onChange={handleCategoriesChange}
                    width={'14.68rem'}
                    filter
                />

                <SelectItems
                    categoryList={interestsList}
                    titleCategories={'Типы'}
                    badgesShow={false}
                    onChange={handleTypesChange}
                    width={'14.68rem'}
                    filter
                />
                <CreateTag eventTags={[]} onChange={handleTagsChange} title={'Поиск по тегу'} />
            </div>

            {activeTab === 'list' && (
                <Backdrop marginTop={84} marginBottom={420} contentLoading={loading}>
                    <FilteredList className={classes.filteredList}>
                        {/* @ts-ignore */}
                        {(!filteredData?.eventFilters && !events) ||
                        //@ts-ignore
                        (filteredData?.eventFilters?.length === 0 && events?.length === 0) ? (
                            <div className={classes.noEventsMessage}>
                                По вашему запросу ничего не найдено
                            </div>
                        ) : (
                            //@ts-ignore
                            (filteredData?.eventFilters || events).map(
                                ({
                                    _id,
                                    description,
                                    name,
                                    startDate,
                                    location,
                                    time,
                                    image,
                                }: IEvent) => (
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
                                )
                            )
                        )}
                    </FilteredList>
                </Backdrop>
            )}
            {activeTab === 'map' && (
                <GoogleMap
                    //@ts-ignore
                    events={
                        (filteredData as { eventFilters: IEvent[] })?.eventFilters ||
                        (events as IEvent[]) ||
                        []
                    }
                    selectedLocation={selectedLocation}
                />
            )}
        </div>
    );
};

export default EventFilters;
