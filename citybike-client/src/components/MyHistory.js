import React from "react";

export const MyHistory = ({ history, modalOC }) => {
  return (
    <div className="history">
      <div className="history__header">
        <h3>Go back in time</h3>
      </div>
      {history.length === 0 && (
        <button>
          <b>Generating history every 15 seconds</b>
        </button>
      )}
      {history.map((item) => (
        <button
          onClick={() => modalOC(item.data)}
          className="button__custom"
          key={item.date}
        >
          {item.date}
        </button>
      ))}
    </div>
  );
};
