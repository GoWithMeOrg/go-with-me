'use client';

import { FC, ReactNode, useContext } from 'react';
import { APIProvider, APIProviderContext } from '@vis.gl/react-google-maps';

// APIProvider подключает <script> Google Maps JS API (~150 КБ в трёх запросах).
// В корневом layout он заставлял платить за это все страницы, включая /login и
// /admin, где карт нет. Теперь граница ставится вокруг конкретных карт, а
// вложенные вызовы становятся прозрачными: например, список карточек на
// главной оборачивает весь список, а Geocoding внутри уже не создаёт свой
// провайдер.
export const GoogleMapsBoundary: FC<{ children?: ReactNode }> = ({ children }) => {
    const parentContext = useContext(APIProviderContext);

    if (parentContext) return <>{children}</>;

    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
            {children}
        </APIProvider>
    );
};
