import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Code", "Name", "Popularity"],
  ["AU-NT", "Northern Territory", 300],
  ["AU-NSW", "New South Wales", 700],
  ["AU-ACT", "Australian Capital Territory", 100],
  ["AU-QLD", "Queensland", 500],
  ["AU-SA", "South Australia", 600],
  ["AU-TAS", "Tasmania", 50],
  ["AU-VIC", "Victoria", 150],
  ["AU-WA", "Western Australia", 350],
];

export default function Geo() {
  return (
    <div className="root-container">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "5vh 3vw 0px",
          fontSize: "24px",
          fontWeight: "bolder",
          color: "#625B57",
          //   fontStyle: "bold",
        }}
      >
        Happines score of each state
      </div>

      <div
        style={{
          position: "relative",
          margin: "5vh 3vw 0px",
          width: "900px",
          height: "500px",
        }}
      >
        <Chart
          options={{
            region: "AU",
            resolution: "provinces",
            displayMode: "regions",
            showZoomOut: true,
            legend: {
              textStyle: { color: "black", fontSize: 16 },
            },
            colorAxis: {
              colors: ["#d4e6f4", "#0d71bf"],
            },
            width: 1000,
            tooltip: {
              textStyle: { fontSize: 16 },
            },
            // datalessRegionColor: "transparent",
          }}
          chartEvents={[
            {
              eventName: "select",
              callback: ({ chartWrapper }) => {
                const chart = chartWrapper.getChart();
                const selection = chart.getSelection();
                if (selection.length === 0) return;
                const region = data[selection[0].row + 1];
                console.log("Selected : " + region);
              },
            },
          ]}
          chartType="GeoChart"
          data={data}
        />
      </div>
    </div>
  );
}
