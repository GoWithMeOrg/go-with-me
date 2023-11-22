import { NextRequest, NextResponse } from "next/server";

import mongooseConnect from "@/database/mongooseConnect";
import TripModel, { ITrip } from "@/database/models/Trip";
import { getUserId } from "@/database/acl/session";

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

    const tripsOfSessionUser = await TripModel.find({ organizer_id: currentSessionUserId }).populate("organizer");

    return NextResponse.json({
        data: tripsOfSessionUser,
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

        const trip: ITrip = await request.json();
        const newTrip = new TripModel({
            ...trip,
            organizer_id: currentSessionUserId,
        });

        const savedTrip = await newTrip.save();
        await savedTrip.populate("organizer");
        return NextResponse.json({
            data: savedTrip,
            error: null,
        });
    } catch (error) {
        return NextResponse.json("error", {
            status: 500,
            statusText: typeof error === "string" ? error : String(error),
        });
    }
}
