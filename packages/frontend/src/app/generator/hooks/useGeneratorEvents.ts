import { useState } from 'react';
import { SEED_EVENTS } from '@/app/graphql/mutations/seedEvents';
import { GET_USERS } from '@/app/graphql/queries/users';
import { User } from '@/app/graphql/types';
import { categoriesList, interestsList } from '@/components/shared/Dropdown/dropdownLists';
import { useMutation, useQuery } from '@apollo/client/react';
import { faker } from '@faker-js/faker';

import { tagsList } from '../tagList';
import { useGeneratorLocation } from './useGeneratorLocation';

export const useGeneratorEvents = () => {
    const [numberEvents, setNumberEvents] = useState<number>();
    const [generatedEvents, setGeneratedEvents] = useState<string>('');
    const [seedEvents] = useMutation(SEED_EVENTS);

    const { generateLocation } = useGeneratorLocation();

    const { data: usersData } = useQuery<{ users: User[] }>(GET_USERS);

    const changeNumberEvents = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numberValue = parseInt(e.target.value, 10);
        if (isNaN(numberValue)) return setNumberEvents(0);
        setNumberEvents(Math.min(10, Math.max(1, numberValue)));
    };

    const handleGenerateEvents = async () => {
        const count = numberEvents;
        if (!count || count <= 0 || !usersData?.users?.length) return;

        try {
            for (let i = 0; i < count; i++) {
                const location = generateLocation();
                const categories = faker.helpers.arrayElements(categoriesList, { min: 1, max: 5 });
                const interests = faker.helpers.arrayElements(interestsList, { min: 1, max: 5 });
                const tags = faker.helpers.arrayElements(tagsList, { min: 1, max: 5 });

                const organizer = faker.helpers.arrayElement(usersData.users)._id;
                const startDate = faker.date.future();
                const endDate = faker.date.future({ refDate: startDate });
                const time = faker.date
                    .anytime({ refDate: startDate })
                    .toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

                await seedEvents({
                    variables: {
                        inputs: {
                            event: {
                                name: faker.lorem.sentence(),
                                description: faker.lorem.paragraph(),
                                startDate: startDate.toISOString(),
                                endDate: endDate.toISOString(),
                                time,
                                privacy: faker.helpers.arrayElement(['PUBLIC', 'PRIVATE']),
                                image: faker.image.url(),
                            },
                            organizer,
                            relations: {
                                location,
                                category: {
                                    categories,
                                },
                                interest: {
                                    interests,
                                },
                                tag: {
                                    tags,
                                },
                            },
                        },
                    },
                });
            }

            setGeneratedEvents('События успешно сгенерированы');
            console.log('События успешно сгенерированы', numberEvents);
        } catch (error) {
            setGeneratedEvents('Ошибка при генерации событий');
            console.error('Ошибка при генерации событий:', error);
        }
    };

    return { handleGenerateEvents, changeNumberEvents, generatedEvents, numberEvents };
};
