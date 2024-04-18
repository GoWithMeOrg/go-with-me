import React from "react";

interface IMarkerIcon {
    color: string;
}

export const MarkerIcon = ({ color }: IMarkerIcon) => {
    return (
        <svg width="16.000000" height="21.000000" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs />
            <rect id="Location" width="16.000000" height="21.000000" fill="#FFFFFF" fillOpacity="0" />
            <path
                id="Vector"
                d="M8 0C3.59 0 0 3.6 0 8C0 14.89 7.7 20.7 8 21C8 21 16 14.5 16 8C16 3.6 12.4 0 8 0ZM8 11.29C6.09 11.29 4.5 9.7 4.5 7.79C4.5 5.89 6.09 4.29 8 4.29C9.9 4.29 11.5 5.89 11.5 7.79C11.5 9.7 9.9 11.29 8 11.29Z"
                fill={color}
                fillOpacity="1.000000"
                fillRule="nonzero"
            />
        </svg>
    );
};

export default MarkerIcon;
