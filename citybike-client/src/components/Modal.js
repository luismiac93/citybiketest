import React from "react";
import { Map, TileLayer } from "react-leaflet";
import { MyMarker } from "./MyMarker";

export const Modal = ({ modalOC, inModal, initialMap, position }) => {
  return (
    <div className="modal__backgound">
      <div className="modal">
        <button className="modal__button" onClick={() => modalOC([])}>
          Cerrar
        </button>
        <Map center={position} zoom={initialMap.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {inModal.map((stations) => (
            <MyMarker key={stations.id} {...stations} />
          ))}
        </Map>
      </div>
    </div>
  );
};
