"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

type Props = {
    children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
    return <SessionProvider>{children}</SessionProvider>;
};

const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
});

export const ApolloWrapper = ({ children }: Props) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
