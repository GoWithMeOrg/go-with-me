interface IButton {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    label?: string;
    children?: React.ReactNode;
    icon?: React.ReactNode;
    id?: string;
    onMouseEnter?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onMouseLeave?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({ className, onClick, label, children, icon, onMouseEnter, onMouseLeave }: IButton) => {
    return (
        <button className={className} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {icon}
            {children}
            {label}
        </button>
    );
};
