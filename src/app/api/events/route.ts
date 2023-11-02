import { NextRequest, NextResponse } from "next/server";

import EventModel, { IEvent } from "@/database/models/Event";
import mongooseConnect from "@/database/mongooseConnect";

// /api/events
export async function GET() {
    await mongooseConnect();
    const events = await EventModel.find({});

    return NextResponse.json({
        data: events,
        error: null,
    });
}

// /api/events
export async function POST(request: NextRequest) {
    try {
        await mongooseConnect();

        // TODO: get organizerId from auth
        const organizerId = "6542bb81b642fb9cda29fee6";

        if (!organizerId) {
            return NextResponse.json(
                {
                    error: "Вы не вошли Ж(",
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
