import CompanionsModel from "@/database/models/Сompanions";

export const companionsResolvers = {
    Query: {
        companions: async (_: any, { userId }: { userId: string }) => {
            const companions = await CompanionsModel.findOne({ user_id: userId }).populate("companions");

            if (!companions) {
                return [];
            }

            return companions.companions;
        },
    },
};
