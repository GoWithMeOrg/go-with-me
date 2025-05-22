"use server";

import { NextResponse } from "next/server";
import { generateEvents, generateUsers } from "@/utils/generator"; // Вынеси функцию в `utils`

export async function POST(req: Request) {
    try {
        const { id, num, coordinates, address, type } = await req.json();

        if (num <= 0 || num > 10) {
            return NextResponse.json({ error: "Некорректное количество" }, { status: 400 });
        }

        if (type === "events") {
            await generateEvents(id, num, coordinates, address);
        }

        if (type === "users") {
            await generateUsers(num, coordinates, address);
        }

        return NextResponse.json({ message: `Сгенерировано ${num} событий` });
    } catch (error) {
        console.error("Ошибка API генерации событий:", error);
        return NextResponse.json({ error: "Ошибка генерации событий" }, { status: 500 });
    }
}
