import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
);

/* 然后柱状图的是x是happiness score(0-9分) y是frequency */
const data = [
  { score: "0", freq: 10 },
  { score: "1", freq: 5 },
  { score: "2", freq: 5 },
  { score: "3", freq: 10 },
  { score: "4", freq: 15 },
  { score: "5", freq: 3 },
  { score: "6", freq: 15 },
  { score: "7", freq: 17 },
  { score: "8", freq: 8 },
  { score: "9", freq: 12 },
];
const totalDuration = 1500;
const delayBetweenPoints = totalDuration / data.length;
const previousY = (ctx) =>
  ctx.index === 0
    ? ctx.chart.scales.y.getPixelForValue(100)
    : ctx.chart
        .getDatasetMeta(ctx.datasetIndex)
        .data[ctx.index - 1].getProps(["y"], true).y;
const animation = {
  x: {
    type: "number",
    easing: "linear",
    duration: delayBetweenPoints,
    from: NaN, // the point is initially skipped
    delay(ctx) {
      if (ctx.type !== "data" || ctx.xStarted) {
        return 0;
      }
      ctx.xStarted = true;
      return ctx.index * delayBetweenPoints;
    },
  },
  y: {
    type: "number",
    easing: "linear",
    duration: delayBetweenPoints,
    from: previousY,
    delay(ctx) {
      if (ctx.type !== "data" || ctx.yStarted) {
        return 0;
      }
      ctx.yStarted = true;
      return ctx.index * delayBetweenPoints;
    },
  },
};
/* chart 调参*/
// let delayed;
export const options = {
  responsive: true,
  animation,
  plugins: {
    legend: {
      display: true,
      labels: {
        // usePointStyle: true,
        font: {
          size: 16,
        },
      },
      // position: "right",
    },
    title: {
      display: true,
      text: "Frequency of Happiness Score",
      font: {
        size: 24,
      },
    },
    tooltip: {
      bodyFont: {
        size: 14,
      },
      titleFont: {
        size: 16,
      },
    },
  },

  scales: {
    x: {
      title: {
        display: true,
        text: "Happiness Score",
        font: {
          size: 20,
        },
      },
      ticks: {
        font: {
          size: 16,
        },
      },
    },
    y: {
      title: {
        display: true,
        text: "Frequency",
        font: {
          size: 20,
        },
      },
      ticks: {
        font: {
          size: 16,
        },
      },
    },
  },
};

function Histogram() {
  return (
    <div className="root-container">
      <div
        style={{
          position: "relative",
          margin: "5vh 0px 0px 3vw",
          width: "80vw",
          height: "80vh",
        }}
      >
        <Bar
          width={"100px"}
          height={"100px"}
          options={options}
          data={{
            labels: data.map((data) => data.score),
            datasets: [
              {
                label: "Frequency",
                data: data.map((data) => data.freq / 100),
                backgroundColor: "#C2847A",
                borderWidth: 0.8,
              },
            ],
          }}
        />
      </div>
    </div>
  );
}

export default Histogram;
