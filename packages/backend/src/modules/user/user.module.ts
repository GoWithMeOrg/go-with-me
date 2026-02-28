import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserSchema, UserDocument } from './entities/user.entity';
import { LocationModule } from 'src/modules/location/location.module';
import { RoleSchema } from '../role/entities/role.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'User', schema: UserSchema },
            { name: 'Role', schema: RoleSchema },
        ]),

        // Используем forwardRef для предотвращения циклической зависимости. Иначе gql сервер не работает
        forwardRef(() => LocationModule),
    ],
    providers: [UserResolver, UserService],
    exports: [UserService, MongooseModule],
})
export class UserModule {}
