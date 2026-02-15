import { useState } from 'react';
import { SEED_USERS } from '@/app/graphql/mutations/seedUsers';
import { categoriesList, interestsList } from '@/components/shared/Dropdown/dropdownLists';
import { useMutation } from '@apollo/client/react';
import { faker } from '@faker-js/faker';

import { tagsList } from '../tagList';
import { useGeneratorLocation } from './useGeneratorLocation';

export const useGeneratorUser = () => {
    const [numberItems, setNumberItems] = useState<number>();
    const [generatedUsers, setGeneratedUsers] = useState<string>('');

    const { generateLocation } = useGeneratorLocation();

    const [seedUsers] = useMutation(SEED_USERS);

    const changeNumberItems = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numberValue = parseInt(e.target.value, 10);
        setNumberItems(numberValue);
    };

    const handleGenerateUsers = async () => {
        if (!numberItems || numberItems <= 0) return;

        try {
            for (let i = 0; i < numberItems; i++) {
                const firstName = faker.person.firstName();
                const lastName = faker.person.lastName();
                const email = faker.internet.email({ firstName, lastName }).toLowerCase();
                const roles = ['69848ba22f26db2c3f2ffe43'];
                const location = generateLocation();
                const categories = faker.helpers.arrayElements(categoriesList, { min: 1, max: 5 });
                const interests = faker.helpers.arrayElements(interestsList, { min: 1, max: 5 });
                const tags = faker.helpers.arrayElements(tagsList, { min: 1, max: 5 });

                const result = await seedUsers({
                    variables: {
                        inputs: {
                            user: {
                                firstName,
                                lastName,
                                email,
                                image: faker.image.avatar(),
                                roles,
                            },

                            location,

                            category: {
                                ownerId: '',
                                ownerType: 'User',
                                categories,
                            },

                            interest: {
                                ownerId: '',
                                ownerType: 'User',
                                interests,
                            },

                            tag: {
                                ownerId: '',
                                ownerType: 'User',
                                tags,
                            },
                        },
                    },
                });
            }

            setGeneratedUsers('Пользователи успешно сгенерированы');
            // console.log('Пользователи успешно сгенерированы');
        } catch (error) {
            setGeneratedUsers('Ошибка при генерации пользователей');
            // console.error('Ошибка при генерации пользователей:', error);
        }
    };

    return { handleGenerateUsers, changeNumberItems, generatedUsers };
};
