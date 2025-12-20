'use client';

export type AuthProvider = 'google' | 'github' | 'facebook';

// // Нужен ли будет аргумент redirectUrl? Все редиректы будут идти с бэка относительно ролей и авторизации
export function signIn(provider: AuthProvider, redirectUrl?: string) {
    // Карта провайдеров и их URL
    const providerUrls: Record<AuthProvider, string> = {
        google: process.env.NEXT_PUBLIC_AUTH_GOOGLE_URL as string,
        github: process.env.NEXT_PUBLIC_AUTH_GITHUB_URL as string,
        facebook: process.env.NEXT_PUBLIC_AUTH_FACEBOOK_URL as string,
    };

    // Получаем URL для провайдера
    let authUrl = providerUrls[provider];
    if (!authUrl) {
        console.error(
            `URL для провайдера "${provider}" не найден. Проверьте переменные окружения.`
        );
        return;
    }

    console.log(`Провайдер "${provider}", URL:`, authUrl);

    // Добавляем redirect URL если он указан. Нужно ли?
    if (redirectUrl) {
        try {
            const url = new URL(authUrl);
            url.searchParams.append('redirect', encodeURIComponent(redirectUrl));
            authUrl = url.toString();
        } catch (error) {
            console.error('Ошибка при обработке redirect URL:', error);
        }
    }

    // Перенаправление
    try {
        window.location.href = authUrl;
    } catch (error) {
        console.error('Failed to redirect:', error);
        // Здесь подумать может предложить авторизоваться через другого провайдера
        // window.location.href = 'http://localhost:4000/auth/google/login';
    }
}

export async function logout() {
    // Просто перенаправляем браузер на эндпоинт логаута на бэкенде
    // Бэкенд сам сделает res.redirect обратно на фронт после очистки сессии
    const logoutUrl = process.env.NEXT_PUBLIC_AUTH_LOGOUT_URL;

    if (logoutUrl) {
        window.location.href = logoutUrl;
    } else {
        console.error('Logout URL не найден');
        // Фолбек, если переменная не подгрузилась
        window.location.href = '/';
    }
}
