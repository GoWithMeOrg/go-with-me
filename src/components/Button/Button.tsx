interface IButton {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    label?: string;
    children?: React.ReactNode;
    icon?: React.ReactNode;
    id?: string;
}

export const Button = ({ className, onClick, label, children, icon }: IButton) => {
    return (
        <button className={className} onClick={onClick}>
            {icon}
            {children}
            {label}
        </button>
    );
};
