import React, { useContext, useEffect, useState } from "react";
import { Map, TileLayer } from "react-leaflet";
import { MyMarker } from "../components/MyMarker";
import { SocketContext } from "../context/SocketContext";

export const MapaPage = () => {
  const [initialMap] = useState({
    lat: 25.790654,
    lng: -80.1300455,
    zoom: 15,
  });
  const [cityStations, setCityStations] = useState([]);

  const { socket } = useContext(SocketContext);

  useEffect(
    () => {
      socket.on("load-info", (payload) => {
        console.log(payload);
        const stations = payload.network.stations || [];
        setCityStations([...stations]);
      });
    },
    [socket, setCityStations]
  );

  console.log(cityStations);

  const position = [initialMap.lat, initialMap.lng];
  return (
    <div className="map">
      <h1> City Bikes in Miami </h1>
      <Map center={position} zoom={initialMap.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cityStations.map((stations) => <MyMarker key={stations.id} {...stations} />)}
      </Map>
    </div>
  );
};
