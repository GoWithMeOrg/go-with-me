import classes from "./Button.module.css";

interface IButton {
    id?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    text?: string;
    children?: React.ReactNode;
    icon?: React.ReactNode;
    type?: "submit" | "reset" | "button" | undefined;
    onMouseEnter?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onMouseLeave?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({ className, onClick, text, children, icon, onMouseEnter, onMouseLeave, type }: IButton) => {
    return (
        <button
            type={type}
            className={className}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {icon}
            {children}
            {text}
        </button>
    );
};
