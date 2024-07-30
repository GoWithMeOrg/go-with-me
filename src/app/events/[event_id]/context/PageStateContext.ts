import { ApolloQueryResult, OperationVariables } from "@apollo/client";
import { createContext } from "react";

export interface IPageStateContext {
    refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>;
    event_id: string;
}

export const PageStateContext = createContext<IPageStateContext | null>(null);
