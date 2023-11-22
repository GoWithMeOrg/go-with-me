import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ApolloWrapper from "@/apollo/client-side-components";
import { NextAuthProvider } from "./providers";
import "../styles/global.css";
import Link from "next/link";

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
                        <menu>
                            <ul>
                                <li>
                                    <Link href="/events">Events</Link>
                                </li>

                                <li>
                                    <Link href="/trips">Trips</Link>
                                </li>
                            </ul>
                        </menu>
                        {children}
                    </ApolloWrapper>
                </NextAuthProvider>
            </body>
        </html>
    );
}
