'use client';

import React from 'react';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { CombinedGraphQLErrors } from '@apollo/client/errors';
import { ErrorLink } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { ApolloProvider } from '@apollo/client/react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { OperationTypeNode } from 'graphql';
import { createClient } from 'graphql-ws';

type Props = {
    children?: React.ReactNode;
};

const errorLink = new ErrorLink(({ error, operation }) => {
    if (CombinedGraphQLErrors.is(error)) {
        error.errors.forEach(({ message, locations, path, extensions }) => {
            if (extensions?.code === 'UNAUTHORIZED') {
                const currentUrl = window.location.href.replace(/\/$/, '');
                const targetUrl = process.env.NEXT_PUBLIC_BASE_URL as string;
                if (currentUrl !== targetUrl) window.location.href = targetUrl;
            }
        });
    }
});

const createApolloClient = () => {
    const httpLink = new HttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
        credentials: 'include',
    });

    const wsLink = new GraphQLWsLink(
        createClient({
            url: process.env.NEXT_PUBLIC_GRAPHQL_WS_ENDPOINT as string,
            connectionParams: {},
        })
    );

    const splitLink = ApolloLink.split(
        ({ operationType }) => {
            return operationType === OperationTypeNode.SUBSCRIPTION;
        },
        wsLink,
        httpLink
    );

    return new ApolloClient({
        ssrMode: false,
        link: errorLink.concat(splitLink),
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
