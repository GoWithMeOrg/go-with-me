import { FC, SVGProps } from "react";

interface ReplyProps extends SVGProps<SVGSVGElement> {}

export const Reply: FC<ReplyProps> = ({ ...rest }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 22 18"
        width="22"
        height="18"
        fill="none"
        stroke="#575B75"
        {...{ ...rest }}
    >
        <path
            d="M12.9 5.8H10.7V1L1 8.9L10.7 16.8V12H12.9C18.5 12 20.3 16.8 20.3 16.8C20.3 16.8 22 5.8 12.9 5.8Z"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinejoin="round"
        />
    </svg>
);
