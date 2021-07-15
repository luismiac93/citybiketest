import React, { useContext, useEffect, useState } from "react";
import { Map, TileLayer } from "react-leaflet";
import { DetailsAvailabilityAmountBike } from "../components/DetailsAvailabilityAmountBike";
import { MyHistory } from "../components/MyHistory";
import { MyMarker } from "../components/MyMarker";
import { SocketContext } from "../context/SocketContext";

export const MapaPage = () => {
  const [initialMap] = useState({
    lat: 25.790654,
    lng: -80.1300455,
    zoom: 15,
  });
  const [cityStations, setCityStations] = useState([]);
  const { socket, online } = useContext(SocketContext);
  const [history, setHistory] = useState([]);

  useEffect(
    () => {
      socket.on("load-info", (payload) => {
        const stations = payload.network.stations || [];
        setCityStations([...stations]);
      });
    },
    []
  );

  useEffect(
    () => {
      socket.on("load-info-new", (payload) => {
        const stations = payload.network.stations || [];
        setCityStations([...stations]);
        const data = history;
        if(data.length === 7){
          data.shift();
        }
        data.push({date: `${new Date()}`,data: [...stations]})
        setHistory([...data]);
      });
    },
    [socket, setHistory]
  );

  console.log("history");
  console.log(history);

  const position = [initialMap.lat, initialMap.lng];
  return (
    <div className="map">
      <h1>
        {" "}
        City Bikes in Miami{" "}
        <span className={online ? "isCircleGreen" : "isCircleRed"} />
      </h1>
      <MyHistory history={history} />
      <DetailsAvailabilityAmountBike cityStations={cityStations} />
      <Map center={position} zoom={initialMap.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cityStations.map((stations) => (
          <MyMarker key={stations.id} {...stations} />
        ))}
      </Map>
    </div>
  );
};
