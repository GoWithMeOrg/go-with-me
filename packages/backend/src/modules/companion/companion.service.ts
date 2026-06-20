import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Companion, CompanionDocument } from './entities/companion.entity';
import { User, UserDocument } from '../user/entities/user.entity';
import { CompanionRequest } from '../companion-request/entities/companion-request.entity';
import { CompanionRequestStatus } from '../companion-request/enums/companion-request.enum';

@Injectable()
export class CompanionService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
        @InjectModel(Companion.name)
        private companionModel: Model<CompanionDocument>,
        @InjectModel(CompanionRequest.name)
        private companionRequestModel: Model<CompanionRequest>
    ) {}

    async getCompanionsByOwner(
        ownerId: Types.ObjectId,
        limit?: number,
        offset?: number
    ): Promise<{ companions: User[]; totalCompanions: number }> {
        const ownerObjectId = new Types.ObjectId(ownerId.toString());

        const companionDoc = await this.companionModel.findOne({ ownerId: ownerObjectId }).lean();

        if (!companionDoc) {
            return { companions: [], totalCompanions: 0 };
        }

        const allIds = companionDoc.companions;

        const companions = await this.userModel
            .find({ _id: { $in: allIds } })
            .skip(offset ?? 0)
            .limit(limit ?? 0)
            .lean();

        return { companions, totalCompanions: allIds.length };
    }

    async removeCompanion(userId: Types.ObjectId, companionId: Types.ObjectId): Promise<boolean> {
        const userObjectId = new Types.ObjectId(userId.toString());
        const companionObjectId = new Types.ObjectId(companionId.toString());

        try {
            await this.companionModel.updateOne(
                { ownerId: userObjectId },
                { $pull: { companions: companionObjectId } }
            );

            await this.companionModel.updateOne(
                { ownerId: companionObjectId },
                { $pull: { companions: userObjectId } }
            );

            const existingCompanion = await this.companionRequestModel.findOne({
                $or: [
                    {
                        sender: userObjectId,
                        receiver: companionObjectId,
                        status: CompanionRequestStatus.ACCEPTED,
                    },
                    {
                        sender: companionObjectId,
                        receiver: userObjectId,
                        status: CompanionRequestStatus.ACCEPTED,
                    },
                ],
            });

            if (existingCompanion) {
                await this.companionRequestModel.findByIdAndDelete(existingCompanion._id);
            }

            return true;
        } catch (error) {
            console.error('Ошибка при удалении друга:', error);
            return false;
        }
    }

    async findCompanion(ownerId: Types.ObjectId, query?: string): Promise<User[]> {
        const getCompanions = await this.companionModel
            .findOne({ ownerId })
            .populate<{ companions: User[] }>({
                path: 'companions',
            })
            .lean()
            .exec();

        if (!getCompanions) {
            return [];
        }

        let filteredCompanions = getCompanions.companions || [];

        // Фильтрация по query (email или имя)
        if (query) {
            const isEmail = query.includes('@');
            if (isEmail) {
                filteredCompanions = filteredCompanions.filter(
                    (companion) => companion.email === query
                );
            } else {
                filteredCompanions = filteredCompanions.filter((companion) =>
                    `${companion.firstName} ${companion.lastName}`
                        .toLowerCase()
                        .includes(query.toLowerCase())
                );
            }
        }

        return filteredCompanions;
    }

}
