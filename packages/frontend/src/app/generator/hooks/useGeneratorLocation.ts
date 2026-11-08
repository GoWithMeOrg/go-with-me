import { useEventFilters } from '@/components/widgets/EventFilters/hooks/useEventFilters';

type City = { country: string; name: string; lat: string; lng: string };

export const useGeneratorLocation = () => {
    const { selectedLocation, setSelectedLocation } = useEventFilters();

    // Города подгружаем по требованию: статический импорт тянул ~120 КБ JSON
    // в основной бандл страницы /generator.
    const generateLocation = async () => {
        let randomCityData: { lng: number; lat: number; address: string };

        if (!selectedLocation) {
            const { default: cities } = (await import('../world_cities.json')) as {
                default: City[];
            };

            if (Array.isArray(cities) && cities.length > 0) {
                const random = cities[Math.floor(Math.random() * cities.length)];
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
                lng: selectedLocation?.location?.lng() as number,
                lat: selectedLocation?.location?.lat() as number,
                address: selectedLocation?.formattedAddress as string,
            };
        }

        const location = {
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
