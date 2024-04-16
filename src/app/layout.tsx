import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Menu } from "@/components/Menu";
import { NextAuthProvider, ApolloWrapper, APIProviderGoogleMaps } from "./providers";
import "@/styles/global.css";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Go with me",
    description: "Travel, learn, party",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ApolloWrapper>
                    <NextAuthProvider>
                        <Menu />
                        <APIProviderGoogleMaps>
                            {children}
                            <Footer />
                        </APIProviderGoogleMaps>
                    </NextAuthProvider>
                </ApolloWrapper>
            </body>
        </html>
    );
}
