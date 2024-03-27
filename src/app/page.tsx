"use client";
import { AuthPanel } from "@/components/AuthPanel";
import { GoogleMap } from "@/components/GoogleMap";

export default function HomePage() {
    return (
        <div className="HomePage">
            <AuthPanel />
            Social meetings <a href="https://github.com/GoWithMeOrg/go-with-me">GoWithMeOrg/go-with-me</a>
            {/* <GoogleMap /> */}
        </div>
    );
}
