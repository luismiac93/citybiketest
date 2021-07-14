import React from "react";
import { Marker, Popup } from "react-leaflet";

export const MyMarker = ({latitude, longitude, name, free_bikes, empty_slots}) => {
  return (
    <Marker
      position={[latitude, longitude]}
      title={name}
    >
      <Popup>
        <h3>{name}</h3>
        <hr />
        <p>
          <b>Slots Bike's Empty:</b>{" "}
          <span className={empty_slots === 0 ? "isRed" : "isGreen"}>
            {empty_slots}
          </span>
          <br />
          <b>Free Bike's:</b>{" "}
          <span className={free_bikes === 0 ? "isRed" : "isGreen"}>
            {free_bikes}
          </span>
        </p>
      </Popup>
    </Marker>
  );
};
