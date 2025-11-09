import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextAuthProvider, ApolloWrapper, APIProviderGoogleMaps } from "./providers";

import { Footer } from "@/components/widgets/Footer";
import { Header } from "@/components/widgets/Header";

import { Container } from "@/components/shared/Container";

import "@/styles/global.css";

const inter = Inter({
    style: ["normal"],
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Tribe Plans",
    description: "Travel, learn, party",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ApolloWrapper>
                    <NextAuthProvider>
                        <APIProviderGoogleMaps>
                            <Suspense>
                                <Header />
                                <Container>{children}</Container>
                                <Footer />
                            </Suspense>
                        </APIProviderGoogleMaps>
                    </NextAuthProvider>
                </ApolloWrapper>
            </body>
        </html>
    );
}
