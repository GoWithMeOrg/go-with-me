import { useContext } from "react";
import { PageActionsContext } from "../page";

export const usePageActionsContext = () => {
    const context = useContext(PageActionsContext);
    if (!context) throw new Error("usePageActionsContext is null");
    return context;
};
