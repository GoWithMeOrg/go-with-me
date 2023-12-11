import { NextRequest, NextResponse } from "next/server";

import TripModel from "@/database/models/Trip";
import mongooseConnect from "@/database/mongooseConnect";
import { getUserId } from "@/database/acl/session";

// /api/events/[id]

// READ
export async function GET(request: NextRequest, context: { params: { id: string } }) {
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

    const id = context?.params?.id;
    // TODO: check userId
    const tripItem = await TripModel.findOne({ _id: id }).populate("organizer");
    return NextResponse.json({
        data: tripItem,
        error: null,
    });
}

// UPDATE
export async function PATCH(request: NextRequest, context: { params: { id: string } }) {
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

    const id = context?.params?.id;
    // TODO: check userId

    const tripFromClient = await request.json();

    await TripModel.updateOne({ _id: id }, { ...tripFromClient });

    const tripItemUpdated = await TripModel.findOne({ _id: id }).populate("organizer");

    return NextResponse.json({
        data: tripItemUpdated,
        error: null,
    });
}

// DELETE
export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
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

    const id = context?.params?.id;

    // TODO: check userId
    const result = await TripModel.deleteOne({ _id: id });

    return NextResponse.json({
        data: result,
        error: null,
    });
}
