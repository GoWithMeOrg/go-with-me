import { useEffect, useState } from 'react';
import { GET_USERS } from '@/app/graphql/queries/users';
import { useEventFilters } from '@/components/widgets/EventFilters/hooks/useEventFilters';
import { useQuery } from '@apollo/client/react';
import { faker } from '@faker-js/faker';
import { useSession } from 'next-auth/react';

import cities from '../world_cities.json';

type City = {
  country: string;
  lat: number;
  lng: number;
  name: string;
};

export const useGenerator = () => {
  const { data: session } = useSession();
  const { data: usersData, refetch } = useQuery(GET_USERS);
  const userID = session?.user.id;

  const { selectedLocation, setSelectedLocation } = useEventFilters();

  const [numberItems, setNumberItems] = useState<number>();
  const [generatedEvents, setGeneratedEvents] = useState(null);
  const [generatedUsers, setGeneratedUsers] = useState(null);
  const [city, setCity] = useState<City | null>(null);

  const randomUser = usersData?.users?.length ? faker.helpers.arrayElement(usersData.users) : null;
  //@ts-ignore
  const randomUserId = randomUser?._id;

  useEffect(() => {
    if (Array.isArray(cities)) {
      const randomCity = faker.helpers.arrayElement(cities);
      // Нужно преобразовать координаты из строки в число.
      setCity({
        ...randomCity,
        lng: parseFloat(randomCity.lng),
        lat: parseFloat(randomCity.lat),
      });
    }
  }, []);

  const changeNumberItems = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numberValue = parseInt(e.target.value, 10);
    setNumberItems(numberValue);
  };

  const handleGenerateEvents = async () => {
    let coord, addr;
    if (!numberItems || numberItems <= 0) return;
    if (!selectedLocation) {
      coord = [city?.lng, city?.lat];
      addr = city?.name;
    } else {
      coord = [
        selectedLocation?.geometry?.location?.lng(),
        selectedLocation?.geometry?.location?.lat(),
      ];
      addr = selectedLocation?.formatted_address;
    }

    // Параметры для запроса на генерацию событий
    const payload = {
      id: randomUserId,
      num: numberItems,
      coordinates: coord,
      address: addr,
      type: 'events',
    };

    //запрос
    try {
      const res = await fetch('/api/generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      setGeneratedEvents(data);

      if (!res.ok) throw new Error(data.error || 'Ошибка при генерации событий');

      console.log('✅ События успешно сгенерированы:', data);
    } catch (error) {
      console.error('❌ Ошибка при генерации событий:', error);
    }
  };

  const handleGenerateUsers = async () => {
    let coord, addr;
    if (!numberItems || numberItems <= 0) return;
    if (!selectedLocation) {
      coord = [city?.lng, city?.lat];
      addr = city?.name;
    } else {
      coord = [
        selectedLocation?.geometry?.location?.lng(),
        selectedLocation?.geometry?.location?.lat(),
      ];
      addr = selectedLocation?.formatted_address;
    }

    // Параметры для запроса на генерацию событий
    const payload = {
      num: numberItems,
      coordinates: coord,
      address: addr,
      type: 'users',
    };

    //запрос
    try {
      const res = await fetch('/api/generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      setGeneratedUsers(data);

      if (!res.ok) throw new Error(data.error || 'Ошибка при генерации событий');

      console.log('✅ Пользователи успешно сгенерированы:', data);
    } catch (error) {
      console.error('❌ Ошибка при генерации событий:', error);
    }
  };

  return {
    changeNumberItems,
    setSelectedLocation,
    handleGenerateEvents,
    generatedEvents,
    handleGenerateUsers,
    generatedUsers,
  };
};
