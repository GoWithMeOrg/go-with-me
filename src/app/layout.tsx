import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";

import { NextAuthProvider } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Go with me",
    description: "Travel, learn, party",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <NextAuthProvider>
            <html lang="en">
                <body className={inter.className}>
                    <menu>
                        <ul>
                            <li>
                                <Link href="/events">Events</Link>
                            </li>
                        </ul>
                    </menu>
                    {children}
                </body>
            </html>
        </NextAuthProvider>
    );
}
