import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextAuthProvider, ApolloWrapper, APIProviderGoogleMaps } from "./providers";
import "@/styles/global.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Suspense } from "react";
import { Container } from "@/components/Container";

const inter = Inter({
    weight: ["400", "500", "600", "700"],
    style: ["normal"],
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Go With Me",
    description: "Travel, learn, party",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ApolloWrapper>
                    <NextAuthProvider>
                        <Suspense>
                            <Header />
                            <Container>
                                <APIProviderGoogleMaps>{children}</APIProviderGoogleMaps>
                            </Container>
                            <Footer />
                        </Suspense>
                    </NextAuthProvider>
                </ApolloWrapper>
            </body>
        </html>
    );
}
