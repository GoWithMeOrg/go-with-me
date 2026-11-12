'use client';

import React from 'react';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { CombinedGraphQLErrors } from '@apollo/client/errors';
import { ErrorLink } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { ApolloProvider } from '@apollo/client/react';
import { OperationTypeNode } from 'graphql';
import { createClient } from 'graphql-ws';

type Props = {
    children?: React.ReactNode;
};

// NEXT_PUBLIC_* инлайнятся в бандл на этапе сборки. Если переменная не передана
// build-arg'ом, Turbopack подставляет пустую строку, а Apollo считает пустой uri
// отсутствующим и уходит на свой дефолт `/graphql` — запрос попадает в Next вместо
// бэкенда. Поэтому пустое значение трактуем как «тот же origin»: за nginx путь
// /api/ проксируется на бэкенд, и адрес не зависит от домена.
const HTTP_ENDPOINT_PATH = '/api/graphql';

const getHttpEndpoint = () =>
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT?.trim() || HTTP_ENDPOINT_PATH;

// graphql-ws не принимает относительные адреса, поэтому при пустой переменной
// собираем абсолютный из текущего origin. url — ленивая функция: на сервере при
// рендере window ещё нет, а к моменту подключения клиент уже в браузере.
const getWsEndpoint = () => {
    const configured = process.env.NEXT_PUBLIC_GRAPHQL_WS_ENDPOINT?.trim();
    if (configured) return configured;

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    return `${protocol}//${window.location.host}${HTTP_ENDPOINT_PATH}`;
};

const errorLink = new ErrorLink(({ error }) => {
    if (CombinedGraphQLErrors.is(error)) {
        error.errors.forEach(({ extensions }) => {
            if (extensions?.code === 'UNAUTHORIZED') {
                const targetUrl = process.env.NEXT_PUBLIC_BASE_URL?.trim();
                if (!targetUrl) return;

                const currentUrl = window.location.href.replace(/\/$/, '');
                if (currentUrl !== targetUrl) window.location.href = targetUrl;
            }
        });
    }
});

const createApolloClient = () => {
    const httpLink = new HttpLink({
        uri: getHttpEndpoint(),
        credentials: 'include',
    });

    const wsLink = new GraphQLWsLink(
        createClient({
            url: getWsEndpoint,
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
