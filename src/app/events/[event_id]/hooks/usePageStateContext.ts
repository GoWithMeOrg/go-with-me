import { useContext } from "react";
import { PageStateContext } from "../page";

export const usePageStateContext = () => {
    const context = useContext(PageStateContext);
    if (!context) throw new Error("usePageActionsContext is null");
    return context;
};
