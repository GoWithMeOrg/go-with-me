'use client';

import React from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { CombinedGraphQLErrors, CombinedProtocolErrors } from '@apollo/client/errors';
import { ErrorLink } from '@apollo/client/link/error';
import { ApolloProvider } from '@apollo/client/react';
import { APIProvider } from '@vis.gl/react-google-maps';

type Props = {
    children?: React.ReactNode;
};

const errorLink = new ErrorLink(({ error, operation }) => {
    if (CombinedGraphQLErrors.is(error)) {
        error.errors.forEach(({ message, locations, path, extensions }) => {
            if (extensions?.code === 'UNAUTHORIZED') {
                // Проверяем текущий URL
                const currentUrl = window.location.href.replace(/\/$/, ''); //отсекаем /
                const targetUrl = process.env.NEXT_PUBLIC_BASE_URL as string;
                // перенаправляем на главную страницу
                if (currentUrl !== targetUrl) window.location.href = targetUrl;
            }
        });
    }
});

const createApolloClient = () => {
    return new ApolloClient({
        ssrMode: false,
        link: errorLink.concat(
            new HttpLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT, credentials: 'include' })
        ),
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
