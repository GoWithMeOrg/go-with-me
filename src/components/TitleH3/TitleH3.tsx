import classes from "./TitleH3.module.css";
import { ITitleH1 } from "@/components/TitleH1/TitleH1";

export const TitleH3 = ({ title, className }: ITitleH1) => {
    return <h3 className={className}>{title}</h3>;
};

export default TitleH3;
