import { faker } from "@faker-js/faker";
import EventModel from "@/database/models/Event";
import { eventCategory, eventTypes } from "@/components/shared/Dropdown/dropdownLists";
import mongooseConnect from "@/database/mongooseConnect";
import UserModel from "@/database/models/User";

export async function generateEvents(id: string, num: number, coordinates: [number, number], address: string) {
    await mongooseConnect();

    const events = [];

    for (let i = 0; i < num; i++) {
        const fakeEvent = {
            organizer_id: id,
            organizer: {
                _id: id,
            },
            name: faker.company.name(),
            description: faker.lorem.paragraph(),
            startDate: faker.date.future(),
            endDate: faker.date.future(),
            time: faker.date.anytime().toTimeString().split(" ")[0],
            createdAt: new Date(),
            updatedAt: new Date(),
            location: {
                type: "Point",
                coordinates,
                properties: {
                    address,
                },
            },
            status: faker.helpers.arrayElement(["public", "private"]),
            categories: faker.helpers.arrayElements(eventCategory, faker.number.int({ min: 1, max: 5 })),
            types: faker.helpers.arrayElements(eventTypes, faker.number.int({ min: 1, max: 5 })),
            tags: faker.helpers.arrayElements(
                ["AI", "Blockchain", "Startup", "Networking"],
                faker.number.int({ min: 1, max: 3 }),
            ),
            image: faker.image.url(),
        };

        events.push(fakeEvent);
    }

    await EventModel.insertMany(events);
    console.log(`✅ Сгенерировано ${num} событий`);
}

export async function generateUsers(num: number, coordinates: [number, number], address: string) {
    await mongooseConnect();

    const users = [];

    for (let i = 0; i < num; i++) {
        const fakeUser = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            image: faker.image.url(),
            location: {
                type: "Point",
                coordinates,
                properties: {
                    address,
                },
            },
            description: faker.lorem.paragraph(),
            categories: faker.helpers.arrayElements(eventCategory, faker.number.int({ min: 1, max: 5 })),
            types: faker.helpers.arrayElements(eventTypes, faker.number.int({ min: 1, max: 5 })),
            tags: faker.helpers.arrayElements(
                ["AI", "Blockchain", "Startup", "Networking"],
                faker.number.int({ min: 1, max: 3 }),
            ),
            emailVerified: faker.helpers.arrayElement(["true"]),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        users.push(fakeUser);
    }

    await UserModel.insertMany(users);
    console.log(`✅ Сгенерировано ${num} пользователей`);
}
