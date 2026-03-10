import { Injectable } from '@nestjs/common';
import { CreateEventInput } from './dto/create-event.input';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './entities/event.entity';
import { Model, Schema as MongoSchema } from 'mongoose';
import { LocationService } from '../location/location.service';
import { CategoryService } from '../category/category.service';
import { InterestService } from '../interest/interest.service';
import { TagService } from '../tag/tag.service';
import { CreateLocationInput } from '../location/dto/create-location.input';
import { CreateCategoryInput } from '../category/dto/create-category.input';
import { CreateInterestInput } from '../interest/dto/create-interest.input';
import { CreateTagInput } from '../tag/dto/create-tag.input';

@Injectable()
export class EventService {
    constructor(
        @InjectModel(Event.name)
        private eventModel: Model<Event>,
        private readonly locationService: LocationService,
        private readonly categoryService: CategoryService,
        private readonly interestService: InterestService,
        private readonly tagService: TagService
    ) {}

    async createEvent(
        createEventInput: CreateEventInput,
        createLocationInput?: CreateLocationInput,
        createCategoryInput?: CreateCategoryInput,
        createInterestInput?: CreateInterestInput,
        createTagInput?: CreateTagInput
    ): Promise<Event> {
        const event = new this.eventModel(createEventInput);
        const savedEvent = await event.save();

        if (createLocationInput) {
            const createdLocation = await this.locationService.createLocation({
                ...createLocationInput,
                properties: {
                    ...createLocationInput.properties,
                    ownerId: savedEvent._id.toString(),
                    ownerType: 'Event',
                },
            });
            savedEvent.location = createdLocation;
            await savedEvent.save();
        }
        if (createCategoryInput) {
            const createCategory = await this.categoryService.createCategories({
                ...createCategoryInput,
                ownerId: savedEvent._id.toString(),
                ownerType: 'Event',
            });
            savedEvent.category = createCategory;
            await savedEvent.save();
        }
        if (createInterestInput) {
            const createInterests = await this.interestService.createInterest({
                ...createInterestInput,
                ownerId: savedEvent._id.toString(),
                ownerType: 'Event',
            });

            savedEvent.interest = createInterests;
            await savedEvent.save();
        }
        if (createTagInput) {
            const createTag = await this.tagService.createTag({
                ...createTagInput,
                ownerId: savedEvent._id.toString(),
                ownerType: 'Event',
            });

            savedEvent.tag = createTag;
            await savedEvent.save();
        }

        return savedEvent;
    }

    async getAllEvents(): Promise<Event[]> {
        return this.eventModel.find().exec();
    }

    async getEventById(id: MongoSchema.Types.ObjectId): Promise<Event | null> {
        return this.eventModel.findById(id).exec();
    }

    async updateEvent(
        id: MongoSchema.Types.ObjectId,
        updateEventInput: Partial<CreateEventInput>
    ): Promise<Event | null> {
        return this.eventModel.findByIdAndUpdate(id, updateEventInput, { new: true }).exec();
    }

    async removeEvent(id: MongoSchema.Types.ObjectId): Promise<{ deletedCount: number }> {
        return this.eventModel.deleteOne({ _id: id }).exec();
    }
}
