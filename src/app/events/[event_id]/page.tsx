"use client";

import { useState } from "react";

import { EventForm } from "@/components/EventForm";
import { Event } from "@/components/Event";

export default function EventPage() {
    const [isEditMode, setIsEditMode] = useState(false);

    return (
        <div>
            <h3>EventPage</h3>
            {isEditMode ? (
                <EventForm
                    {...{
                        tripName: "tripName",
                        description: "description",
                        startDate: "2023-11-01",
                        endDate: "2023-12-31",
                        isPrivate: false,
                        bannerImage: "bannerImage",
                    }}
                />
            ) : (
                <Event />
            )}
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
