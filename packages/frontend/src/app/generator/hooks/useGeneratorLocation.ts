import { useEventFilters } from '@/components/widgets/EventFilters/hooks/useEventFilters';
import { faker } from '@faker-js/faker';

import cities from '../world_cities.json';

export const useGeneratorLocation = () => {
    const { selectedLocation, setSelectedLocation } = useEventFilters();

    const generateLocation = () => {
        let randomCityData: { lng: number; lat: number; address: string };

        if (!selectedLocation) {
            if (Array.isArray(cities) && cities.length > 0) {
                const random = faker.helpers.arrayElement(cities);
                randomCityData = {
                    lng: parseFloat(random.lng),
                    lat: parseFloat(random.lat),
                    address: random.name,
                };
            } else {
                // Фолбек, если массив городов пуст
                randomCityData = { lng: 0, lat: 0, address: 'No city data' };
            }
        } else {
            randomCityData = {
                lng: selectedLocation?.geometry?.location?.lng() as number,
                lat: selectedLocation?.geometry?.location?.lat() as number,
                address: selectedLocation?.formatted_address as string,
            };
        }

        let location = {
            geometry: {
                coordinates: [randomCityData.lng, randomCityData.lat],
            },
            properties: {
                address: randomCityData.address,
                ownerId: '',
                ownerType: 'User',
            },
        };

        return location;
    };

    return {
        generateLocation,
        setSelectedLocation,
    };
};
