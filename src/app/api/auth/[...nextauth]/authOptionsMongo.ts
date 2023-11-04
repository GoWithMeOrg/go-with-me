import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { Adapter } from "next-auth/adapters";

import clientPromise from "@/database/mongodbConnect";

import { authCommonOptions } from "@/options/authCommonOptions";

export const authOptions = {
    ...authCommonOptions,
    adapter: MongoDBAdapter(clientPromise) as Adapter,
};
