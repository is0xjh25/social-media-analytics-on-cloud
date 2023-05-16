import React from "react";
import "../style/Scenario1.css";
import { Chart } from "react-google-charts";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const data_line = [
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

export const data_geo = [
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

const totalDuration = 1500;
const delayBetweenPoints = totalDuration / data_line.length;
const previousY = (ctx) =>
  ctx.index === 0
    ? ctx.chart.scales.y.getPixelForValue(100)
    : ctx.chart
        .getDatasetMeta(ctx.datasetIndex)
        .data_line[ctx.index - 1].getProps(["y"], true).y;
const animation_line = {
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
export const options_line = {
  responsive: true,
  animation_line,
  // animation: {
  //   x: {
  //     duration: 5000,
  //     from: 0,
  //   },
  //   y: {
  //     duration: 3000,
  //     from: 500,
  //   },
  // },

  plugins: {
    legend: {
      display: true,
      labels: {
        font: {
          size: 16,
        },
      },
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
  elements: {
    // line: { showLine: true, borderWidth: 3, backgroundColor: "#9BD0F5" },
    point: {
      radius: 5,
      hoverRadius: 10, // to make it bigger when user hovers put larger number than radius.
    },
  },
  // graph layout
  // layout: {
  //   padding: {
  //     top: 5,
  //     left: 15,
  //     right: 15,
  //     bottom: 15,
  //   },
  // },
};


const data_his = [
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
const totalDuration_his = 1500;
const delayBetweenPoints_his = totalDuration_his / data_his.length;
const previousY_his = (ctx) =>
  ctx.index === 0
    ? ctx.chart.scales.y.getPixelForValue(100)
    : ctx.chart
        .getDatasetMeta(ctx.datasetIndex)
        .data[ctx.index - 1].getProps(["y"], true).y;
const animation_his = {
  x: {
    type: "number",
    easing: "linear",
    duration: delayBetweenPoints_his,
    from: NaN, // the point is initially skipped
    delay(ctx) {
      if (ctx.type !== "data" || ctx.xStarted) {
        return 0;
      }
      ctx.xStarted = true;
      return ctx.index * delayBetweenPoints_his;
    },
  },
  y: {
    type: "number",
    easing: "linear",
    duration: delayBetweenPoints,
    from: previousY_his,
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
export const options_his = {
  responsive: true,
  animation_his,
  plugins: {
    legend: {
      display: true,
      labels: {
        // usePointStyle: true,
        font: {
          size: 10,
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
        size: 15,
      },
      titleFont: {
        size: 15,
      },
    },
  },

  scales: {
    x: {
      title: {
        display: true,
        text: "Happiness Score",
        font: {
          size: 15,
        },
      },
      ticks: {
        font: {
          size: 15,
        },
      },
    },
    y: {
      title: {
        display: true,
        text: "Frequency",
        font: {
          size: 15,
        },
      },
      ticks: {
        font: {
          size: 15,
        },
        
      },
    },
  },
};




function Scenario2() {
  return (
    <div class="container">
    <section class = "topic">
        <h1>Happiness & Location</h1> 
        <h3><i>Geo Analysis with Twitter Data</i></h3>
        
        <p>This scenario involves geo-related analysis, as we investigated people's happiness score across different locations in Australia.
            Australian Statistical Geography Standard (ASGS) was used for statistical areas reference. Among the statistical standards, we used 
          Statistical Areas Level 4 (i.e. Greater Capital City Statistical Areas), and Non ABS Structures (i.e. Suburbs and Localities)
        </p >
        <h3>In this scenario, our study mainly focused on answering the following questions with the happiness scoring algorithm: </h3>
        <li> <a href=" ">Scenario 2.1:</a > What's the average happiness score of Australia as a baseline?</li>
        <li> <a href="#s2.2">Scenario 2.2:</a > What's the happiness score of each states?</li>
        <li> <a href="#s2.3">Scenario 2.3:</a > What's the happiness score of greater-capital-city-statistical-areas & the rest area?</li>
        <li> <a href="#s2.4">Scenario 2.4:</a > What's the happiness socre of suburbs and locations?</li>
    </section>


    <section class = "s2.1">
        <h1 id="s2.1">Scenario 2.1</h1>
      <h4>The average happiness score of Australia is 5.91526.</h4>
      <div className="Line">
        </div>
    </section>


    <section id = "s2.2">
        <h1 id="s2.2">Scenario 2.2</h1>
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
                const region = data_geo[selection[0].row + 1];
                console.log("Selected : " + region);
              },
            },
          ]}
          chartType="GeoChart"
          data={data_geo}
        />
    </section>

    <section class = "s2.3">
        <h1 id="s2.3">Scenario 2.3</h1>
      <h4>Higher happiness score during the weekends.</h4>
          <div className="histogram">
          <Bar
          options={options_his}
          data={{
            labels: data_his.map((data_his) => data_his.score),
            datasets: [
              {
                label: "Frequency",
                data: data_his.map((data_his) => data_his.freq / 100),
                backgroundColor: "#C2847A",
                borderWidth: 0.8,
              },
            ],
          }}
        />
        </div>
    </section>
    <section class = "s2.4">
        <h1 id="s2.4">Scenario 2.4</h1>
      <h4>babababababababa</h4>
    </section>
    </div>

  );
}

export default Scenario2;