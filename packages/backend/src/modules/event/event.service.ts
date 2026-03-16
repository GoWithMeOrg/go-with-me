import { Injectable, NotFoundException } from '@nestjs/common';
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
import { Category } from '../category/entities/category.entity';
import { Interest } from '../interest/entities/interest.entity';
import { Tag } from '../tag/entities/tag.entity';
import { Location } from '../location/entities/location.entity';

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
        organizer: MongoSchema.Types.ObjectId,
        createEventInput: CreateEventInput,
        createLocationInput?: CreateLocationInput,
        createCategoryInput?: CreateCategoryInput,
        createInterestInput?: CreateInterestInput,
        createTagInput?: CreateTagInput
    ): Promise<Event> {
        const event = new this.eventModel({
            ...createEventInput,
            organizer,
        });
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

    // async getAllEvents(): Promise<Event[]> {
    //     return this.eventModel.find().exec();
    // }

    async getEventsByOrganizer(organizer_id: MongoSchema.Types.ObjectId): Promise<
        (Omit<Event, 'location' | 'category' | 'interest' | 'tag'> & {
            location?: Location | null;
            category?: Category | null;
            interest?: Interest | null;
            tag?: Tag | null;
        })[]
    > {
        const events = await this.eventModel.find({ organizer: organizer_id }).exec();

        const eventsWithRelations = await Promise.all(
            events.map(async (event) => {
                const [location, category, interest, tag] = await Promise.all([
                    this.locationService.getLocationByOwner(event._id),
                    this.categoryService.getCategoriesByOwner(event._id),
                    this.interestService.getInterestByOwner(event._id),
                    this.tagService.getTagByOwner(event._id),
                ]);

                return {
                    ...event.toObject(),
                    location,
                    category,
                    interest,
                    tag,
                };
            })
        );

        return eventsWithRelations;
    }

    async getEventById(event_id: MongoSchema.Types.ObjectId) {
        const [event, location, category, interest, tag] = await Promise.all([
            this.eventModel.findById(event_id),
            this.locationService.getLocationByOwner(event_id),
            this.categoryService.getCategoriesByOwner(event_id),
            this.interestService.getInterestByOwner(event_id),
            this.tagService.getTagByOwner(event_id),
        ]);

        if (!event) {
            throw new NotFoundException(`Event ${event_id} not found`);
        }

        return {
            ...event.toObject(),
            location,
            category,
            interest,
            tag,
        };
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
