import mongoose, { ConnectOptions } from "mongoose";

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

/**
 * @see https://mongoosejs.com/docs/index.html
 */

/**
 * @see https://mongoosejs.com/docs/connections.html
 * @see http://mongodb.github.io/node-mongodb-native/2.2/api/MongoClient.html#connect
 * ConnectOptions
 */
const options: ConnectOptions = {};

export default async function mongooseConnect() {
    await mongoose
        .connect(process.env.MONGODB_URI as string, options)
        .then((mongoose) => {
            console.log("Mongoose connected");
            return mongoose;
        })
        .catch((error) => console.error(error));
}
