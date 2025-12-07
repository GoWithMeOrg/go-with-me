import { Injectable } from '@nestjs/common';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from './entities/event.entity';
import { DeleteResult, Model, Schema as MongoSchema } from 'mongoose';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name)
    private eventModel: Model<EventDocument>
  ) {}

  getAllEvents() {
    return this.eventModel.find();
  }

  getEventById(id: MongoSchema.Types.ObjectId) {
    return this.eventModel.findById(id);
  }

  createEvent(createEventInput: CreateEventInput) {
    const createEvent = new this.eventModel(createEventInput);
    return createEvent.save();
  }

  updateEvent(id: MongoSchema.Types.ObjectId, updateEventInput: UpdateEventInput) {
    return this.eventModel.findByIdAndUpdate(id, updateEventInput, {
      new: true,
    });
  }

  removeEvent(id: MongoSchema.Types.ObjectId): Promise<DeleteResult> {
    return this.eventModel.deleteOne({ _id: id }).exec();
  }
}
