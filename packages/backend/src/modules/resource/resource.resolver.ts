import { Roles } from '@/common/decorators/roles.decorator.js';
import { RolesGuard } from '@/common/guards/roles.guard.js';
import { SessionAuthGuard } from '@/common/guards/session-auth.guard.js';
import { Permission } from '@/modules/permission/entities/permission.entity.js';
import { PermissionService } from '@/modules/permission/permission.service.js';
import { Resource } from '@/modules/resource/entities/resource.entity.js';
import { ResourceService } from '@/modules/resource/resource.service.js';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

@Resolver(() => Resource)
export class ResourceResolver {
    constructor(
        private readonly resourceService: ResourceService,
        private readonly permissionService: PermissionService
    ) {}

    @ResolveField(() => [Permission])
    async permissions(@Parent() resource: Resource) {
        const { _id } = resource;
        // Запрашиваем права напрямую через сервис разрешений
        return this.permissionService.getPermissionsByResourceId(_id);
    }

    // Получить список всех ресурсов, которые уже есть в базе данных
    @Query(() => [Resource], {
        name: 'resources',
        description: 'Список всех зарегистрированных ресурсов',
    })
    async findAllRegistryResource() {
        return this.resourceService.findAllRegistryResource();
    }

    @Query(() => [Resource], {
        name: 'searchResources',
        description: 'Поиск ресурсов по названию или слагу для управления ролями',
    })
    @UseGuards(SessionAuthGuard, RolesGuard)
    @Roles('admin') // Поиск ресурсов доступен только админам
    async searchResources(
        @Args('query', { type: () => String, nullable: true }) query?: string
    ): Promise<Resource[]> {
        return this.resourceService.searchResources(query);
    }

    // Найти один конкретный ресурс по его техническому имени (slug)
    @Query(() => Resource, { name: 'resourceBySlug', nullable: true })
    async findOne(@Args('slug') slug: string) {
        return this.resourceService.findBySlug(slug);
    }

    // Регистрация новой сущности в системе прав.
    // Эту мутацию мы будем вызывать из админки, когда находим новую модель в коде.
    @Mutation(() => Resource)
    async registerResource(
        @Args('slug', { description: 'Техническое имя (например: EVENT)' }) slug: string,
        @Args('name', { description: 'Отображаемое имя (например: Мероприятия)' }) name: string
    ) {
        return this.resourceService.registerResource(slug, name);
    }
}
