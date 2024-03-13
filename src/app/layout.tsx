import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Menu } from "@/components/Menu";
import { NextAuthProvider, ApolloWrapper } from "./providers";

import "@/styles/global.css";
import { Maps } from "@/components/Map";

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
                        {children}
                    </NextAuthProvider>
                </ApolloWrapper>
            </body>
        </html>
    );
}
