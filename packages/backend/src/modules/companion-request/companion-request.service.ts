import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Companion, CompanionDocument } from '../companion/entities/companion.entity';
import { CompanionRequest, CompanionRequestDocument } from './entities/companion-request.entity';
import { CompanionRequestStatus } from './enums/companion-request.enum';
import { Model, Schema as MongoSchema } from 'mongoose';

@Injectable()
export class CompanionRequestService {
    constructor(
        @InjectModel(Companion.name) private companionModel: Model<CompanionDocument>,
        @InjectModel(CompanionRequest.name)
        private companionRequestModel: Model<CompanionRequestDocument>
    ) {}

    // Получить все заявки по id пользователя
    async getCompanionRequests(
        user_id: MongoSchema.Types.ObjectId
    ): Promise<CompanionRequestDocument[]> {
        return await this.companionRequestModel
            .find({
                $or: [
                    { sender: user_id, status: CompanionRequestStatus.PENDING },
                    { receiver: user_id, status: CompanionRequestStatus.PENDING },
                ],
            })
            .populate('sender')
            .populate('receiver')
            .exec();
    }

    // Отправить заявку в компаньоны
    async sendRequestCompanion(
        sender_id: MongoSchema.Types.ObjectId,
        receiver_id: MongoSchema.Types.ObjectId
    ): Promise<CompanionRequestDocument> {
        if (sender_id === receiver_id) {
            throw new Error('Нельзя отправить запрос самому себе');
        }

        // Проверка на уже существующую дружбу
        const existingCompanions = await this.companionModel
            .findOne({
                ownerId: sender_id,
            })
            .exec();
        if (existingCompanions?.companions.some((id) => id === receiver_id)) {
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

    // async acceptCompanionRequest: { requestId }: { requestId: string }) => {
    // 	const request = await CompanionRequest.findById(requestId);
    // 	if (!request) {
    // 		throw new Error("Заявка не найдена");
    // 	}

    // 	if (request.status !== "pending") {
    // 		throw new Error("Заявка уже обработана");
    // 	}

    // 	request.status = CompanionRequestStatus.ACCEPTED;
    // 	request.updatedAt = new Date();

    // 	const senderId = new mongoose.Types.ObjectId(request.sender);
    // 	const receiverId = new mongoose.Types.ObjectId(request.receiver);

    // 	// Обновляем список друзей отправителя
    // 	await CompanionsModel.updateOne(
    // 		{ user_id: senderId },
    // 		{ $addToSet: { companions: receiverId } },
    // 		{ upsert: true },
    // 	);

    // 	// Обновляем список друзей получателя
    // 	await CompanionsModel.updateOne(
    // 		{ user_id: receiverId },
    // 		{ $addToSet: { companions: senderId } },
    // 		{ upsert: true },
    // 	);

    // 	return await request.save();
    // }

    // Принять заявку в компаньоны

    async acceptCompanionRequest(
        requestId: MongoSchema.Types.ObjectId
    ): Promise<CompanionRequest | null> {
        const request = await this.companionRequestModel.findById(requestId).exec();
        if (!request) {
            throw new Error('Заявка не найдена');
        }

        if (request.status !== CompanionRequestStatus.PENDING) {
            throw new Error('Заявка уже обработана');
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

    /**
     * Отклонить заявку в компаньоны
     */
    // async rejectRequest(requestId: string): Promise<CompanionRequestDocument | null> {
    //     const request = await this.companionRequestModel.findById(requestId).exec();
    //     if (!request) {
    //         throw new Error('Заявка не найдена');
    //     }

    //     if (request.status !== CompanionRequestStatus.PENDING) {
    //         throw new Error('Заявка уже обработана');
    //     }

    //     request.status = CompanionRequestStatus.DECLINED;
    //     return request.save();
    // }

    /**
     * Получить входящие заявки для пользователя
     */
    // async getIncomingRequests(
    //     userId: MongoSchema.Types.ObjectId
    // ): Promise<CompanionRequestDocument[]> {
    //     return this.companionRequestModel
    //         .find({
    //             receiver_id: userId,
    //             status: CompanionRequestStatus.PENDING,
    //         })
    //         .populate('sender_id')
    //         .exec();
    // }

    /**
     * Получить исходящие заявки пользователя
     */
    // async getOutgoingRequests(
    //     userId: MongoSchema.Types.ObjectId
    // ): Promise<CompanionRequestDocument[]> {
    //     return this.companionRequestModel
    //         .find({
    //             sender_id: userId,
    //             status: CompanionRequestStatus.PENDING,
    //         })
    //         .populate('receiver_id')
    //         .exec();
    // }

    /**
     * Удалить заявку
     */
    // async remove(id: string): Promise<CompanionRequestDocument | null> {
    //     return this.companionRequestModel.findByIdAndDelete(id).exec();
    // }
}
