import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongoSchema } from 'mongoose';

import { Companion, CompanionDocument } from './entities/companion.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class CompanionService {
    constructor(
        @InjectModel(Companion.name)
        private companionModel: Model<CompanionDocument>
    ) {}

    async getCompanionsByOwner(
        ownerId: MongoSchema.Types.ObjectId,
        limit?: number,
        offset?: number
    ): Promise<{ companions: User[]; totalCompanions: number }> {
        const [companionsDoc, totalDoc] = await Promise.all([
            this.companionModel
                .findOne({ ownerId })
                .populate<{ companions: User[] }>({
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
}
