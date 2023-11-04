import { NextRequest, NextResponse } from "next/server";

import EventModel from "@/database/models/Event";
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
    const eventItem = await EventModel.findOne({ _id: id });
    return NextResponse.json({
        data: eventItem,
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

    const eventFromClient = await request.json();

    await EventModel.updateOne({ _id: id }, { ...eventFromClient });

    const eventItemUpdated = await EventModel.findOne({ _id: id });

    return NextResponse.json({
        data: eventItemUpdated,
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
    const result = await EventModel.deleteOne({ _id: id });

    return NextResponse.json({
        data: result,
        error: null,
    });
}
