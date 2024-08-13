import { FC, SVGProps } from "react";

interface ReplyProps extends SVGProps<SVGSVGElement> {}

export const Reply: FC<ReplyProps> = ({ ...rest }) => (
    <svg width="22" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12.9 5.8h-2.2V1L1 8.9l9.7 7.9V12h2.2c5.6 0 7.4 4.8 7.4 4.8s1.7-11-7.4-11Z"
            stroke="#575B75"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinejoin="round"
        />
    </svg>
);
