export interface ITitleH1 {
    title: string;
    className?: string;
}

export const TitleH1 = ({ title, className }: ITitleH1) => {
    return <h1 className={className}>{title}</h1>;
};

export default TitleH1;
