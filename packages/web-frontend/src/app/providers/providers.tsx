'use client';

import React from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { APIProvider } from '@vis.gl/react-google-maps';

type Props = {
    children?: React.ReactNode;
};

// export const NextAuthProvider = ({ children }: Props) => {
//     return <SessionProvider>{children}</SessionProvider>;
// };

const createApolloClient = () => {
    return new ApolloClient({
        ssrMode: false,
        link: new HttpLink({
            uri: 'http://localhost:4000/graphql',
            // uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
            credentials: 'include',
        }),
        cache: new InMemoryCache(),
    });
};

let client: ApolloClient | null = null;
const getClient = () => {
    if (!client) client = createApolloClient();
    return client;
};

export const ApolloWrapper = ({ children }: Props) => {
    const apolloClient = getClient();
    return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export const APIProviderGoogleMaps = ({ children }: Props) => {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
    return <APIProvider apiKey={API_KEY}>{children}</APIProvider>;
};
