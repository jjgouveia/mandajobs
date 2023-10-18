import React from "react";

export default function EverywhereILookAround() {
  return (
    <>
      <div className="ball"></div>
      <div
        className="ball"
        style={
          {
            "--delay": "-12s",
            "--size": "0.35",
            "--speed": "25s",
          } as React.CSSProperties
        }
      ></div>

      <div
        className="ball"
        style={
          {
            "--delay": "-10s",
            "--size": "0.3",
            "--speed": "15s",
          } as React.CSSProperties
        }
      ></div>
    </>
  );
}
