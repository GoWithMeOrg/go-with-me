'use client';

import React from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { SessionProvider } from 'next-auth/react';

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  }),
  cache: new InMemoryCache(),
});

export const ApolloWrapper = ({ children }: Props) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export const APIProviderGoogleMaps = ({ children }: Props) => {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
  return <APIProvider apiKey={API_KEY}>{children}</APIProvider>;
};
