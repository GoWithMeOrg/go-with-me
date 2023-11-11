import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
    throw new Error('Migrations: Missing "MONGODB_URI"');
}

const client = new MongoClient(process.env.MONGODB_URI);

export async function up(): Promise<void> {
    await client.connect();
    const db = client.db("go-with-me");
    await db.collection("events").updateMany({}, { $rename: { organizerId: "organizer_id" } });
}

export async function down(): Promise<void> {
    await client.connect();
    const db = client.db("go-with-me");
    await db.collection("events").updateMany({}, { $rename: { organizer_id: "organizerId" } });
}
