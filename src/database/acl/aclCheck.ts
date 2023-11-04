import { NextRequest } from "next/server";

import AclModel from "@/database/models/Acl";
import type { ActionType } from "@/database/models/Acl";
import { getToken } from "@/database/acl/session";
import SessionModel from "@/database/models/Session";

type AclCheckArgs = {
    userId: string;
    resourceId: string;
    actionType: ActionType;
};

/**
 * Check if user has access to this route
 */
const aclCheck = async ({ userId, resourceId, actionType }: AclCheckArgs) => {
    const allowedActionTypes = await AclModel.findOne(
        {
            userId,
            resourceId,
        },
        { actionTypes: 1 },
    );

    return allowedActionTypes?.actionTypes.includes(actionType);
};

const isActionAllowedForRequest = async (request: NextRequest) => {
    const sessionToken = getToken(request);

    if (!sessionToken) return false;

    const session = await SessionModel.findOne({ sessionToken });

    console.log("session: ", session); // eslint-disable-line

    if (!session) return false;
    // TODO: add check for session expiration

    const userId = session.userId.toString();
};

export { aclCheck };
