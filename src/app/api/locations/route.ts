import { NextRequest, NextResponse } from "next/server";
import mongooseConnect from "@/database/mongooseConnect";
import CommentModel from "@/database/models/Comment";
import { getUserId } from "@/database/acl/session";
import LocationModel from "@/database/models/Location";

// Чтение комментариев
// Коммментарии будут искаться по идентификатору события, к которому они относятся
// GET /api/comments?event_id=5f8b1d8f0b9c2e1b1c9d4c7a
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const event_id = searchParams.get("event_id");

    // Подключаемся к базе данных
    await mongooseConnect();

    // Получаем ID пользователя из сессии
    const currentSessionUserId = await getUserId(request);

    // Необходимо проверить, что пользователь авторизован
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

    // Ищем комментарии по идентификатору события
    // и добавляем данные о пользователе, который создал комментарий через populate
    const locations = await LocationModel.find({ event_id }).sort({ createdAt: -1 }).populate("author");

    // Возвращаем комментарии
    return NextResponse.json({
        data: locations,
        error: null,
    });
}

// Создание комментария
// POST /api/comments
export async function POST(request: NextRequest) {
    // Подключаемся к базе данных
    await mongooseConnect();

    // Получаем ID пользователя из сессии
    const currentSessionUserId = await getUserId(request);

    // Необходимо проверить, что пользователь авторизован
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

    // Получаем данные из тела запроса
    const locationFromClient = await request.json();

    // Создаем локацию
    const location = await LocationModel.create({
        author_id: currentSessionUserId,
        event_id: locationFromClient.event_id,
        content: locationFromClient.content,
    });

    // Сохраняем комментарий
    await location.save();

    // Возвращаем комментарий
    return NextResponse.json({
        data: location,
        error: null,
    });
}
