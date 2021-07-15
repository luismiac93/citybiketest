import React from "react";

export const DetailsAvailabilityAmountBike = ({ cityStations }) => {
  return (
    <div className="details">
      <div className="details__header">
        <h3>Details Availability Amount Bike List</h3>
      </div>
      {cityStations.map((item) => (
        <div key={item.id} className="button__custom">
          <span>
            <b>{item.name}</b>
          </span>
          <br />
          <span>Slots Bike's Empty: {item.empty_slots}</span>
          <br />
          <span>Free Bike's: {item.free_bikes}</span>
        </div>
      ))}
    </div>
  );
};
