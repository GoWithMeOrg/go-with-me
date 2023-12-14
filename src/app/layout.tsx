import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ApolloWrapper from "@/apollo/client-side-components";
import { NextAuthProvider } from "./providers";
import "../styles/global.css";
import { Menu } from "@/components/Menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Go with me",
    description: "Travel, learn, party",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <NextAuthProvider>
                    <ApolloWrapper>
                        <Menu />
                        {children}
                    </ApolloWrapper>
                </NextAuthProvider>
            </body>
        </html>
    );
}
