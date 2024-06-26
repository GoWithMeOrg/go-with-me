import { FC, SVGProps } from "react";

interface LikeProps extends SVGProps<SVGSVGElement> {}

export const Like: FC<LikeProps> = ({ ...rest }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" fill="none" {...{ ...rest }}>
        <path
            stroke="#575B75"
            strokeWidth="2"
            d="M9.666 16.546 2.256 8.73C.583 6.963.58 4.073 2.257 2.304 3.906.565 6.552.565 8.2 2.304l.741.782.726.766.726-.766.74-.782c1.65-1.739 4.295-1.739 5.944 0 1.677 1.77 1.677 4.656 0 6.425l-7.41 7.817Z"
        />
    </svg>
);
