import { NextRequest, NextResponse } from "next/server";

import mongooseConnect from "@/database/mongooseConnect";
import EventModel, { IEvent } from "@/database/models/Event";
import { getUserId } from "@/database/acl/session";

// /api/events
// READ
export async function GET(request: NextRequest) {
    await mongooseConnect();

    const currentSessionUserId = await getUserId(request);

    if (!currentSessionUserId) {
        return NextResponse.json(
            {
                error: "User not found",
            },
            {
                status: 403,
                statusText: "User not found",
            },
        );
    }

    const eventsOfSessionUser = await EventModel.find({ organizer_id: currentSessionUserId });

    return NextResponse.json({
        data: eventsOfSessionUser,
        error: null,
    });
}

// /api/events
// CREATE
export async function POST(request: NextRequest) {
    try {
        await mongooseConnect();

        // TODO: get organizer_id from auth
        const currentSessionUserId = await getUserId(request);

        if (!currentSessionUserId) {
            return NextResponse.json(
                {
                    error: "User not found",
                },
                {
                    status: 403,
                    statusText: "User not found",
                },
            );
        }

        const event: IEvent = await request.json();
        const newEvent = new EventModel({
            ...event,
            organizer_id: currentSessionUserId,
        });

        const savedEvent = await newEvent.save();
        return NextResponse.json({
            data: savedEvent,
            error: null,
        });
    } catch (error) {
        return NextResponse.json("error", {
            status: 500,
            statusText: typeof error === "string" ? error : String(error),
        });
    }
}
