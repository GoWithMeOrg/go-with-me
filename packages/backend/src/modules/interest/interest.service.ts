import { Injectable } from '@nestjs/common';
import { CreateInterestInput } from './dto/create-interest.input';
import { UpdateInterestInput } from './dto/update-interest.input';
import { DeleteResult, Model, Schema as MongoSchema } from 'mongoose';
import { Interest, InterestDocument } from './entities/interest.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class InterestService {
    constructor(
        @InjectModel(Interest.name)
        private interestModel: Model<InterestDocument>
    ) {}

    // --- получить интересы по ID ---
    async getInterestById(interest_id: MongoSchema.Types.ObjectId): Promise<Interest | null> {
        return await this.interestModel.findById(interest_id).exec();
    }

    // --- получить интересы по владельцу ---
    async getInterestByOwner(ownerId: MongoSchema.Types.ObjectId): Promise<Interest | null> {
        return await this.interestModel.findOne({ ownerId }).exec();
    }

    async createInterest(createInterestInput: CreateInterestInput) {
        const createInterest = new this.interestModel(createInterestInput);
        return await createInterest.save();
    }

    async updateInterest(
        interest_id: MongoSchema.Types.ObjectId,
        updateInterestInput: UpdateInterestInput
    ) {
        return await this.interestModel.findByIdAndUpdate(interest_id, updateInterestInput, {
            new: true,
        });
    }

    async removeInterest(interest_id: MongoSchema.Types.ObjectId): Promise<DeleteResult> {
        return await this.interestModel.deleteOne({ _id: interest_id }).exec();
    }
}
