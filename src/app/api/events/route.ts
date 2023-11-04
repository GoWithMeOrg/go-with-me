import { NextRequest, NextResponse } from "next/server";

import mongooseConnect from "@/database/mongooseConnect";
import EventModel, { IEvent } from "@/database/models/Event";
import { getUserId } from "@/database/acl/session";

// /api/events
// READ
export async function GET(request: NextRequest) {
    await mongooseConnect();

    // TODO: check userId
    const events = await EventModel.find({});

    return NextResponse.json({
        data: events,
        error: null,
    });
}

// /api/events
// CREATE
export async function POST(request: NextRequest) {
    try {
        await mongooseConnect();

        // TODO: get organizerId from auth
        const organizerId = await getUserId(request);

        if (!organizerId) {
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
            organizerId,
        });

        const saved = await newEvent.save();
        return NextResponse.json(saved);
    } catch (error) {
        return NextResponse.json("error", {
            status: 500,
            statusText: typeof error === "string" ? error : String(error),
        });
    }
}
