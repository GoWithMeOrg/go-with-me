import { Injectable } from '@nestjs/common';
import { CategoryService } from '@/modules/category/category.service.js';
import { Category } from '@/modules/category/entities/category.entity.js';
import { Interest } from '@/modules/interest/entities/interest.entity.js';
import { InterestService } from '@/modules/interest/interest.service.js';
import { Location } from '@/modules/location/entities/location.entity.js';
import { LocationService } from '@/modules/location/location.service.js';
import { Tag } from '@/modules/tag/entities/tag.entity.js';
import { TagService } from '@/modules/tag/tag.service.js';
import { Event } from '@/modules/event/entities/event.entity.js';

export type EventWithRelations = Omit<Event, 'location' | 'category' | 'interest' | 'tag'> & {
    location?: Location | null;
    category?: Category | null;
    interest?: Interest | null;
    tag?: Tag | null;
};

//Вспомогательный класс для обогащения событий связанными данными
@Injectable()
export class EnrichEventHelper {
    constructor(
        private readonly locationService: LocationService,
        private readonly categoryService: CategoryService,
        private readonly interestService: InterestService,
        private readonly tagService: TagService
    ) {}

    //Преобразует событие, добавляя связанные данные (location, category, interest, tag)
    async enrichEventWithRelations(event: Event): Promise<EventWithRelations> {
        const [location, category, interest, tag] = await Promise.all([
            this.locationService.getLocationByOwner(event._id),
            this.categoryService.getCategoriesByOwner(event._id),
            this.interestService.getInterestByOwner(event._id),
            this.tagService.getTagByOwner(event._id),
        ]);

        return {
            _id: event._id,
            organizer: event.organizer,
            name: event.name,
            description: event.description,
            startDate: event.startDate,
            endDate: event.endDate,
            time: event.time,
            privacy: event.privacy,
            image: event.image,
            location,
            category,
            interest,
            tag,
        };
    }

    //Преобразует массив событий, добавляя связанные данные
    async enrichEventsWithRelations(events: Event[]): Promise<EventWithRelations[]> {
        return Promise.all(events.map((event) => this.enrichEventWithRelations(event)));
    }
}
