"use server";

import { faker } from "@faker-js/faker";
import mongooseConnect from "@/database/mongooseConnect";
import EventModel from "@/database/models/Event";
import mongoose from "mongoose";

import { eventCategory, eventTypes } from "@/components/shared/Dropdown/dropdownLists";

export async function generateEvents(num: number) {
    try {
        await mongooseConnect();

        for (let i = 0; i < num; i++) {
            const fakeEvent = new EventModel({
                id: new mongoose.Types.ObjectId(),
                organizer_id: new mongoose.Types.ObjectId(),
                organizer: {
                    _id: new mongoose.Types.ObjectId(),
                    name: faker.person.fullName(),
                    email: faker.internet.email(),
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
                    coordinates: [faker.location.longitude(), faker.location.latitude()],
                    properties: {
                        address: faker.location.streetAddress(),
                    },
                },
                status: faker.helpers.arrayElement(["public", "private"]),

                categories: faker.helpers.arrayElements(eventCategory, faker.number.int({ min: 1, max: 3 })),
                types: faker.helpers.arrayElements(eventTypes, faker.number.int({ min: 1, max: 2 })),
                tags: faker.helpers.arrayElements(
                    ["AI", "Blockchain", "Startup", "Networking"],
                    faker.number.int({ min: 1, max: 3 }),
                ),
                image: faker.image.url(),
            });
            await fakeEvent.save();
        }
        console.log("События успешно сгенерированы и сохранены в БД.");
    } catch (error) {
        console.error("Ошибка при генерации событий:", error);
    }
}
