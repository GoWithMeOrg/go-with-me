"use client";

import { useState } from "react";

import { EventForm } from "@/components/EventForm";
import { Event } from "@/components/Event";

export default function EventPage() {
    const [isEditMode, setIsEditMode] = useState(false);

    return (
        <div>
            <h3>EventPage</h3>
            {isEditMode ? <EventForm {...{
                tripName: 'tripName',
                description: 'description',
                bannerImage: 'bannerImage',
                endDate: '2023-05-05',
                startDate: '2023-10-10',
                isPrivate: true,
            }} /> : <Event />}
            <button
                onClick={() => {
                    setIsEditMode(!isEditMode);
                }}
            >
                Edit
            </button>
        </div>
    );
}
