import { AuthPanel } from "@/components/AuthPanel";

export default function LoginPage() {
    return (
        <main>
            <h1>Login</h1>
            <h3>Для работы с сервисом нужно войти</h3>
            <AuthPanel />
        </main>
    );
}
