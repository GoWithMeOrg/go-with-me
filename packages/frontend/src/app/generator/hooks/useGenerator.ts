import { useState } from 'react';
import { GET_USERS } from '@/app/graphql/queries/users';
import { useQuery } from '@apollo/client/react';
import { faker } from '@faker-js/faker';

import { useGeneratorLocation } from './useGeneratorLocation';
import { useGeneratorUser } from './useGeneratorUser';

export const useGenerator = () => {
    const { setSelectedLocation } = useGeneratorLocation();
    const { handleGenerateUsers, changeNumberItems, generatedUsers } = useGeneratorUser();

    const { data: usersData } = useQuery(GET_USERS);
    const [generatedEvents, setGeneratedEvents] = useState(null);

    //@ts-ignore
    const randomUser = (usersData as { users: { _id: string }[] })?.users?.length
        ? //@ts-ignore
          faker.helpers.arrayElement(usersData.users)
        : null;
    //@ts-ignore
    const randomUserId = randomUser?._id;

    return {
        changeNumberItems,
        setSelectedLocation,
        // handleGenerateEvents,
        generatedEvents,
        handleGenerateUsers,
        generatedUsers,
    };
};
