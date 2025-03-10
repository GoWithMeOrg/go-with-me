"use server";

import { NextResponse } from "next/server";
import { generateEvents } from "@/utils/generator"; // Вынеси функцию в `utils`

export async function POST(req: Request) {
    try {
        //await mongooseConnect();
        const { id, num, coordinates, address } = await req.json();

        if (num <= 0) {
            return NextResponse.json({ error: "Некорректное количество событий" }, { status: 400 });
        }

        await generateEvents(id, num, coordinates, address);
        return NextResponse.json({ message: `Сгенерировано ${num} событий` });
    } catch (error) {
        console.error("Ошибка API генерации событий:", error);
        return NextResponse.json({ error: "Ошибка генерации событий" }, { status: 500 });
    }
}
