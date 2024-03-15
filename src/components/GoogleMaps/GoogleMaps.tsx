import React, { useRef, useState } from "react";
import { Map } from "./Map";
import { Search } from "./Search";
import { Loader } from "@googlemaps/js-api-loader";
// import { SearchLocationInput } from "./SearchLocationInput";

export const GoogleMaps = () => {
    return (
        <div style={{ height: "100vh", width: "100%" }}>
            {/* поиск работает только по объектам, нужно еще по населенным пунктам */}
            {/* <SearchLocationInput setSelectedLocation={setSelectedLocation} /> */}
            {/* <Map /> */}
            <Search />
        </div>
    );
};

export default GoogleMaps;
