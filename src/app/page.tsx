"use client";
import { AuthPanel } from "@/components/AuthPanel";
import { GeneralComponent } from "@/components/GoogleMapApi";
import { GoogleMaps } from "@/components/GoogleMaps";
import { Map } from "@/components/GoogleMaps/Map";

export default function HomePage() {
    return (
        <div className="HomePage">
            <AuthPanel />
            Social meetings <a href="https://github.com/GoWithMeOrg/go-with-me">GoWithMeOrg/go-with-me</a>
            {/* <Map /> */}
            {/* <GeneralComponent /> */}
            <GoogleMaps />
        </div>
    );
}
