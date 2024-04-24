import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextAuthProvider, ApolloWrapper, APIProviderGoogleMaps } from "./providers";
import "@/styles/global.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    weight: "400",
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
                        {/* <Menu /> */}
                        <APIProviderGoogleMaps>{children}</APIProviderGoogleMaps>
                        <Footer />
                    </NextAuthProvider>
                </ApolloWrapper>
            </body>
        </html>
    );
}
