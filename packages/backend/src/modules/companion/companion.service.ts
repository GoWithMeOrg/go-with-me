import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongoSchema } from 'mongoose';

import { Companion, CompanionDocument } from './entities/companion.entity';
import { User } from '../user/entities/user.entity';
import { CompanionRequest } from '../companion-request/entities/companion-request.entity';
import { CompanionRequestStatus } from '../companion-request/enums/companion-request.enum';

@Injectable()
export class CompanionService {
    constructor(
        @InjectModel(Companion.name)
        private companionModel: Model<CompanionDocument>,
        @InjectModel(CompanionRequest.name)
        private companionRequestModel: Model<CompanionRequest>
    ) {}

    async getCompanionsByOwner(
        ownerId: MongoSchema.Types.ObjectId,
        limit?: number,
        offset?: number
    ): Promise<{ companions: User[]; totalCompanions: number }> {
        const [companionsDoc, totalDoc] = await Promise.all([
            this.companionModel.findOne({ ownerId }).populate<{ companions: User[] }>({
                path: 'companions',
                options: {
                    ...(limit ? { limit } : {}),
                    ...(offset ? { skip: offset } : {}),
                },
            }),
            this.companionModel.findOne({ ownerId }),
        ]);

        const companions = companionsDoc?.companions || [];
        const totalCompanions = totalDoc?.companions?.length ?? 0;

        return { companions, totalCompanions };
    }

    async removeCompanion(
        userId: MongoSchema.Types.ObjectId,
        companionId: MongoSchema.Types.ObjectId
    ): Promise<boolean> {
        try {
            // находим активную заявку со статусом "accepted"
            const existingCompanion = await this.companionRequestModel.findOne({
                $or: [
                    {
                        sender: userId,
                        receiver: companionId,
                        status: CompanionRequestStatus.ACCEPTED,
                    },
                    {
                        sender: companionId,
                        receiver: userId,
                        status: CompanionRequestStatus.ACCEPTED,
                    },
                ],
            });

            if (!existingCompanion) {
                return false;
            }

            // обновляем список друзей у пользователя (удаляем companionId)
            await this.companionModel.updateOne(
                { ownerId: userId },
                { $pull: { companions: companionId } }
            );

            // обновляем список друзей у компаньона (удаляем userId)
            await this.companionModel.updateOne(
                { ownerId: companionId },
                { $pull: { companions: userId } }
            );

            // удаляем заявку о дружбе
            await this.companionRequestModel.findByIdAndDelete(existingCompanion._id);

            return true;
        } catch (error) {
            console.error('Ошибка при удалении друга:', error);
            return false;
        }
    }

    async findCompanion(
        ownerId: MongoSchema.Types.ObjectId,
        query?: string
    ): Promise<User[]> {
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
