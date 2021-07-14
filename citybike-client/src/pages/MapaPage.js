import React, { useContext, useEffect, useState } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { SocketContext } from "../context/SocketContext";

export const MapaPage = () => {
  const [mapa] = useState({
    response: false,
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
  });

  const position2 = [51.505, -0.09]

  const { socket } = useContext(SocketContext);

  useEffect(
    () => {
      socket.on("load-info", (payload) => {
        console.log(payload);
      });
    },
    [socket]
  );

  const { response } = mapa;
  const position = [mapa.lat, mapa.lng];
  return (
    <div className="map">
      <h1> City Bikes in Miami </h1>
      <Map center={position2} zoom={mapa.zoom} >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} title="data" >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    </div>
  );
};
