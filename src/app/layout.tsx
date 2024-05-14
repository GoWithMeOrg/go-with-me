import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextAuthProvider, ApolloWrapper, APIProviderGoogleMaps } from "./providers";
import "@/styles/global.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useSession } from "next-auth/react";
import { Loader } from "@/components/Loader";

const inter = Inter({
    subsets: ["latin"],
    style: ["normal"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Go With Me",
    description: "Travel, learn, party",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={inter.className}>
            <body>
                <ApolloWrapper>
                    <NextAuthProvider>
                        <Header />
                        <APIProviderGoogleMaps>{children}</APIProviderGoogleMaps>
                        <Footer />
                    </NextAuthProvider>
                </ApolloWrapper>
            </body>
        </html>
    );
}
