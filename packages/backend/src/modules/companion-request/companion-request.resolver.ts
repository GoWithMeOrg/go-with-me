import { Resolver, Mutation, Args, ID } from '@nestjs/graphql';
import { CompanionRequestService } from './companion-request.service';
import { CompanionRequest } from './entities/companion-request.entity';
import { UseGuards } from '@nestjs/common';
import { SessionAuthGuard } from 'src/common/guards/session-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Model, Schema as MongoSchema } from 'mongoose';

@Resolver(() => CompanionRequest)
export class CompanionRequestResolver {
    constructor(private readonly companionRequestService: CompanionRequestService) {}

    //Отправить заявку в компаньоны
    @Mutation(() => CompanionRequest)
    @UseGuards(SessionAuthGuard, RolesGuard)
    async sendRequestCompanion(
        @Args('sender_id', { type: () => ID }) sender_id: MongoSchema.Types.ObjectId,
        @Args('receiver_id', { type: () => ID }) receiver_id: MongoSchema.Types.ObjectId
    ): Promise<CompanionRequest> {
        return this.companionRequestService.sendRequestCompanion(sender_id, receiver_id);
    }

    //Принять заявку в компаньоны
    @Mutation(() => CompanionRequest)
    @UseGuards(SessionAuthGuard, RolesGuard)
    async acceptCompanionRequest(
        @Args('request_id', { type: () => ID }) request_id: MongoSchema.Types.ObjectId
    ): Promise<CompanionRequest | null> {
        return this.companionRequestService.acceptCompanionRequest(request_id);
    }

    /**
     * Отклонить заявку в компаньоны
     */
    // @Mutation(() => CompanionRequest)
    // @UseGuards(SessionAuthGuard, RolesGuard)
    // async rejectCompanionRequest(
    //     @Args('request_id', { type: () => ID }) request_id: string
    // ): Promise<CompanionRequest | null> {
    //     return this.companionRequestService.rejectRequest(request_id);
    // }

    /**
     * Получить входящие заявки для пользователя
     */
    // @Query(() => [CompanionRequest], { name: 'incomingCompanionRequests' })
    // @UseGuards(SessionAuthGuard, RolesGuard)
    // async getIncomingRequests(
    //     @Args('user_id', { type: () => ID }) user_id: string
    // ): Promise<CompanionRequest[]> {
    //     return this.companionRequestService.getIncomingRequests(user_id);
    // }

    /**
     * Получить исходящие заявки пользователя
     */
    // @Query(() => [CompanionRequest], { name: 'outgoingCompanionRequests' })
    // @UseGuards(SessionAuthGuard, RolesGuard)
    // async getOutgoingRequests(
    //     @Args('user_id', { type: () => ID }) user_id: string
    // ): Promise<CompanionRequest[]> {
    //     return this.companionRequestService.getOutgoingRequests(user_id);
    // }

    /**
     * Получить заявку по ID
     */
    // @Query(() => CompanionRequest, { name: 'companionRequest', nullable: true })
    // @UseGuards(SessionAuthGuard, RolesGuard)
    // async getCompanionRequest(
    //     @Args('id', { type: () => ID }) id: string
    // ): Promise<CompanionRequest | null> {
    //     return this.companionRequestService.findOne(id);
    // }

    /**
     * Удалить заявку
     */
    // @Mutation(() => CompanionRequest, { nullable: true })
    // @UseGuards(SessionAuthGuard, RolesGuard)
    // async removeCompanionRequest(
    //     @Args('id', { type: () => ID }) id: string
    // ): Promise<CompanionRequest | null> {
    //     return this.companionRequestService.remove(id);
    // }
}
