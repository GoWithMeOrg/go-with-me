import { ITitleH1 } from "@/components/TitleH1/TitleH1";

export const TitleH2 = ({ title, className }: ITitleH1) => {
    return <h2 className={className}>{title}</h2>;
};

export default TitleH2;
