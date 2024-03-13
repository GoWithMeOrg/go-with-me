import { AuthPanel } from "@/components/AuthPanel";
import { Map } from "@/components/Map";

export default function HomePage() {
    return (
        <div className="HomePage">
            <AuthPanel />
            Social meetings <a href="https://github.com/GoWithMeOrg/go-with-me">GoWithMeOrg/go-with-me</a>
            <Map />
        </div>
    );
}
