import { ConfigService } from '@nestjs/config';
import MongoStore from 'connect-mongo';

let mongoStoreInstance: MongoStore;

export function getMongoStore(configService: ConfigService): MongoStore {
    if (!mongoStoreInstance) {
        mongoStoreInstance = MongoStore.create({
            mongoUrl: configService.getOrThrow('MONGODB_URI'),
            collectionName: 'sessions',
        });
    }
    return mongoStoreInstance;
}
