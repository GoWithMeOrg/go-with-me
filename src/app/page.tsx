"use client";
import { AuthPanel } from "@/components/AuthPanel";
import { GoogleMaps } from "@/components/GoogleMaps";
import { TripRoute } from "@/components/GoogleMaps/TripRoute";

export default function HomePage() {
    return (
        <div className="HomePage">
            <AuthPanel />
            Social meetings <a href="https://github.com/GoWithMeOrg/go-with-me">GoWithMeOrg/go-with-me</a>
            {/* <TripRoute /> */}
            <GoogleMaps />
        </div>
    );
}
