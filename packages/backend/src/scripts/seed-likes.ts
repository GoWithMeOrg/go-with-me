import mongoose, { Model, Types } from 'mongoose';

interface IUser {
    _id: Types.ObjectId;
}

interface IEvent {
    _id: Types.ObjectId;
}

interface ILike {
    user: Types.ObjectId;
    ownerId: Types.ObjectId;
    ownerType: 'Event' | 'Comment' | 'Trip';
}

const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/go-with-me';

const LikeSchema = new mongoose.Schema<ILike>(
    {
        user: { type: Types.ObjectId, required: true },
        ownerId: { type: Types.ObjectId, required: true },
        ownerType: { type: String, enum: ['Event', 'Comment', 'Trip'], required: true },
    },
    { timestamps: true },
);

LikeSchema.index({ ownerId: 1, ownerType: 1 });

const LikeModel: Model<ILike> = mongoose.model<ILike>('Like', LikeSchema);
const UserModel: Model<IUser> = mongoose.model<IUser>('User', new mongoose.Schema<IUser>({}));
const EventModel: Model<IEvent> = mongoose.model<IEvent>('Event', new mongoose.Schema<IEvent>({}));

async function main() {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const users = await UserModel.find({}, { _id: 1 }).lean();
    const events = await EventModel.find({}, { _id: 1 }).lean();
    console.log(`Found ${users.length} users, ${events.length} events`);

    if (users.length === 0 || events.length === 0) {
        console.log('No users or events to process');
        await mongoose.disconnect();
        return;
    }

    const likes: { user: Types.ObjectId; ownerId: Types.ObjectId; ownerType: 'Event' }[] = [];

    for (const event of events) {
        const count = Math.floor(Math.random() * users.length) + 1;
        const shuffled = [...users].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, count);

        for (const user of selected) {
            likes.push({
                user: user._id,
                ownerId: event._id,
                ownerType: 'Event',
            });
        }
    }

    const result = await LikeModel.insertMany(likes, { ordered: false });
    console.log(`Created ${result.length} likes`);
    await mongoose.disconnect();
}

main().catch((err) => {
    console.error('Error:', err);
    process.exit(1);
});
