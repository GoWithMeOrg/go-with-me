import '@/styles/global.css';

import { Suspense } from 'react';
import { SessionProviderGQL } from '@/app/providers/session/SessionProviderGQL';
import { Container } from '@/components/shared/Container';
import { Footer } from '@/components/widgets/Footer';
import { Header } from '@/components/widgets/Header';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { APIProviderGoogleMaps, ApolloWrapper } from './providers/providers';

const inter = Inter({
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Tribe Plans',
    description: 'Travel, learn, party',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ApolloWrapper>
                    <SessionProviderGQL>
                        <APIProviderGoogleMaps>
                            <Suspense>
                                <Header />
                                <Container>{children}</Container>
                                <Footer />
                            </Suspense>
                        </APIProviderGoogleMaps>
                    </SessionProviderGQL>
                </ApolloWrapper>
            </body>
        </html>
    );
}
