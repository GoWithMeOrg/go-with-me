import mongoose, { Model, Types } from 'mongoose';

interface IUser {
    _id: Types.ObjectId;
}

interface IEvent {
    _id: Types.ObjectId;
    privacy?: string;
}

interface IJoin {
    user: Types.ObjectId;
    ownerId: Types.ObjectId;
    ownerType: 'Event' | 'Trip';
}

const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/go-with-me';

const JoinSchema = new mongoose.Schema<IJoin>(
    {
        user: { type: Types.ObjectId, required: true },
        ownerId: { type: Types.ObjectId, required: true },
        ownerType: { type: String, enum: ['Event', 'Trip'], required: true },
    },
    { timestamps: true },
);

JoinSchema.index({ ownerId: 1, ownerType: 1 });

const JoinModel: Model<IJoin> = mongoose.model<IJoin>('Join', JoinSchema);
const UserModel: Model<IUser> = mongoose.model<IUser>('User', new mongoose.Schema<IUser>({}));
const EventModel: Model<IEvent> = mongoose.model<IEvent>('Event', new mongoose.Schema<IEvent>({}));

async function main() {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const users = await UserModel.find({}, { _id: 1 }).lean();
    const events = await EventModel.find({ privacy: 'PUBLIC' }, { _id: 1, privacy: 1 }).lean();
    console.log(`Found ${users.length} users, ${events.length} public events`);

    if (users.length === 0 || events.length === 0) {
        console.log('No users or events to process');
        await mongoose.disconnect();
        return;
    }

    await JoinModel.deleteMany({ ownerType: 'Event' });
    console.log('Cleared existing event joins');

    const maxJoin = Math.min(users.length, 100);

    const scored = events.map((event) => ({ event, score: Math.random() }));
    scored.sort((a, b) => b.score - a.score);

    const docs: { user: Types.ObjectId; ownerId: Types.ObjectId; ownerType: 'Event' }[] = [];

    for (let i = 0; i < scored.length; i++) {
        const { event } = scored[i];
        const t = i / scored.length;
        const raw = 1 - Math.pow(t, 0.4);
        const noise = (Math.random() - 0.5) * 4;
        const count = Math.max(1, Math.min(maxJoin, Math.floor(raw * maxJoin + noise)));

        const shuffled = [...users].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, count);

        for (const user of selected) {
            docs.push({
                user: user._id,
                ownerId: event._id,
                ownerType: 'Event' as const,
            });
        }
    }

    for (let i = 0; i < docs.length; i += 1000) {
        const batch = docs.slice(i, i + 1000);
        await JoinModel.insertMany(batch, { ordered: false });
    }

    console.log(`Created ${docs.length} joins`);
    await mongoose.disconnect();
}

main().catch((err) => {
    console.error('Error:', err);
    process.exit(1);
});
