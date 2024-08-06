import { ApolloQueryResult, OperationVariables } from "@apollo/client";
import { createContext, Dispatch, SetStateAction } from "react";

export interface ICommentsListContext {
    refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>;
    event_id: string;
    replyIdForm: string | null;
    setReplyIdForm: Dispatch<SetStateAction<string | null>>;
}

export const CommentsListContext = createContext<ICommentsListContext | null>(null);
