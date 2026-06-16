import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Companion, CompanionDocument } from '../companion/entities/companion.entity';
import { CompanionRequest, CompanionRequestDocument } from './entities/companion-request.entity';
import { CompanionRequestStatus } from './enums/companion-request.enum';
import { Model, Types } from 'mongoose';

@Injectable()
export class CompanionRequestService {
    constructor(
        @InjectModel(Companion.name) private companionModel: Model<CompanionDocument>,
        @InjectModel(CompanionRequest.name)
        private companionRequestModel: Model<CompanionRequestDocument>
    ) {}

    // Получить все заявки по id пользователя
    async getCompanionRequests(
        user_id: Types.ObjectId
    ): Promise<CompanionRequestDocument[]> {
        return await this.companionRequestModel
            .find({
                $or: [{ receiver: user_id, status: CompanionRequestStatus.PENDING }],
            })
            .populate('sender')
            .populate('receiver')
            .exec();
    }

    // Отправить заявку в компаньоны
    async sendRequestCompanion(
        sender_id: Types.ObjectId,
        receiver_id: Types.ObjectId
    ): Promise<CompanionRequestDocument> {
        if (sender_id.toString() === receiver_id.toString()) {
            throw new Error('Нельзя отправить запрос самому себе');
        }

        // Проверка на уже существующую дружбу
        const existingCompanions = await this.companionModel
            .findOne({
                ownerId: sender_id,
            })
            .exec();
        if (existingCompanions?.companions.some((id) => id.toString() === receiver_id.toString())) {
            throw new Error('Пользователь уже у вас в друзьях');
        }

        // Проверка на уже существующий активный запрос
        const existingRequest = await this.companionRequestModel
            .findOne({
                $or: [
                    {
                        sender: sender_id,
                        receiver: receiver_id,
                        status: CompanionRequestStatus.PENDING,
                    },
                    {
                        sender: receiver_id,
                        receiver: sender_id,
                        status: CompanionRequestStatus.PENDING,
                    },
                ],
            })
            .exec();

        if (existingRequest) {
            throw new Error('Запрос уже существует');
        }

        // Создание новой заявки
        const newRequest = new this.companionRequestModel({
            sender: sender_id,
            receiver: receiver_id,
            status: CompanionRequestStatus.PENDING,
        });

        const saved = await newRequest.save();
        await saved.populate(['sender', 'receiver']);
        return saved;
    }

    // Принять заявку в компаньоны
    async acceptCompanionRequest(
        request_id: Types.ObjectId
    ): Promise<CompanionRequest | null> {
        const request = await this.companionRequestModel.findById(request_id).exec();

        if (!request) {
            throw new Error('Заявка не найдена');
        }

        request.status = CompanionRequestStatus.ACCEPTED;
        await request.save();

        // Добавить пользователей в друзья друг другу
        await this.companionModel
            .findOneAndUpdate(
                { ownerId: request.sender },
                { $addToSet: { companions: request.receiver } },
                { upsert: true }
            )
            .exec();
        await this.companionModel
            .findOneAndUpdate(
                { ownerId: request.receiver },
                { $addToSet: { companions: request.sender } },
                { upsert: true }
            )
            .exec();

        return request;
    }

    // Отклонить заявку в компаньоны
    async rejectCompanionRequest(request_id: Types.ObjectId) {
        const request = await this.companionRequestModel.findById(request_id).exec();

        if (!request) {
            throw new Error('Заявка не найдена');
        }

        return await this.companionRequestModel.findByIdAndDelete(request_id);
    }
}
