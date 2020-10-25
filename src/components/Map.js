import React from "react";
import { Map as Mapp, TileLayer } from "react-leaflet";
import "../Map.css";
import { showData } from "../util";

const Map = ({ countries, casesType, center, zoom }) => {
  return (
    <div className="map" style={{ marginBottom: "10px" }}>
      <Mapp center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showData(countries, casesType)}
      </Mapp>
    </div>
  );
};

export default Map;
