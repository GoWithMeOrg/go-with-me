import { Resolver, Query, Mutation, Args, ResolveField, Parent, HideField } from '@nestjs/graphql';
import { ResourceService } from './resource.service';
import { Resource } from './entities/resource.entity';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { SessionAuthGuard } from 'src/common/guards/session-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UserRole } from 'src/common/enums/roles.enum';
import { Permission } from '../permission/entities/permission.entity';
import { PermissionService } from '../permission/permission.service';

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
    @Roles(UserRole.ADMIN) // Поиск ресурсов доступен только админам
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
