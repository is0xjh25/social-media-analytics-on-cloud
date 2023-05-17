import React, { useEffect, useState } from "react";
import "../style/Scenario2.css";
import { Chart } from "react-google-charts";
import { mean } from "lodash"
import au from '../image/australia.png';
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

let initialData = [
  ["Code", "Name", "Happiness Score"],
  ["AU-NSW", "New South Wales", 0],
  ["AU-QLD", "Queensland", 0],
  ["AU-SA", "South Australia", 0],
  ["AU-WA", "Western Australia", 0],
  ["AU-TAS", "Tasmania", 0],
  ["AU-VIC", "Victoria", 0],
  ["AU-NT", "Northern Territory", 0],
  ["AU-ACT", "Australian Capital Territory", 0],
];


  export const data_geo = [
    ["Code", "Name", "Happiness Score"],
    ["AU-NSW", "New South Wales", 0],
    ["AU-QLD", "Queensland", 0],
    ["AU-SA", "South Australia", 0],
    ["AU-WA", "Western Australia", 0],
    ["AU-TAS", "Tasmania", 0],
    ["AU-VIC", "Victoria", 0],
    ["AU-NT", "Northern Territory", 0],
    ["AU-ACT", "Australian Capital Territory", 0],
  ];


const data_his=[]

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
      text: "Happiness Score of each Great Capital Cities",
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


// const data_his = [
//   { score: "0", freq: 10 },
//   { score: "1", freq: 5 },
//   { score: "2", freq: 5 },
//   { score: "3", freq: 10 },
//   { score: "4", freq: 15 },
//   { score: "5", freq: 3 },
//   { score: "6", freq: 15 },
//   { score: "7", freq: 17 },
//   { score: "8", freq: 8 },
//   { score: "9", freq: 12 },
// ];
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
        text: "Greact Capital Cites",
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
        text: "Happiness Score",
        font: {
          size: 15,
        },
      },
      min:5.8,
      max:6.1,
      ticks: {
        font: {
          size: 15,
        },
        
      },
    },
  },
};


function Scenario2() {

  const [data, setData] = useState(initialData);
  useEffect(() => {
      fetch(process.env.REACT_APP_BACKEND_URL + 'gccCount')
          .then(response => response.json())
          .then(fetchedData => {
              let newData = [...initialData];
              for(let i = 0; i < fetchedData.length; i++) {
                  // 这里我们假设 fetchedData 的顺序和 initialData 的顺序是一致的
                  let avgValue = parseFloat(fetchedData[i].value.avg);
                  // 更新对应的 Popularity 值
                  newData[i + 1][2] = avgValue;
              }
              setData(newData);
              console.log(newData)
          })
          .catch(error => console.log('Error:', error));

  }, []);


  const [data_hist, setDataHis] = useState([]);
    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_URL + 'gccCount2')
        .then(response => response.json())
        .then(data_hist => {
            setDataHis(data_hist);

        });
    }, []);

    const data_histg = data_hist.map(item => ({
        name: item.key,
        score: item.value.avg
    }));

    const averageScore = mean(data_histg.map(item =>item.score))

    const belowAvgColor = "#fddbc7"
    const aboveAvgColor = "#f4a582"

    const averageLineDataset = {
      label: "Average Score",
      data: Array(data_histg.length).fill(averageScore), // an array of the same length as the original data, all filled with the average score
      type: 'line', // this will be a line chart
      borderColor: "#808080", // line color
      borderWidth: 2, // line width
      fill: false, // don't fill under the line
    };













  return (
    <div class="container">
    <section class = "topic">
        <h1 id="head">Happiness & Location</h1> 
        <h2><i>Geo Analysis with Twitter Data</i></h2>
        
        <p>This scenario involves geo-related analysis, as we investigated people's happiness score across different locations in Australia.
            Australian Statistical Geography Standard (ASGS) was used for statistical areas reference. Among the statistical standards, we used 
          Statistical Areas Level 4 (i.e. Greater Capital City Statistical Areas), and Non ABS Structures (i.e. Suburbs and Localities)
        </p >
        <h2>In this scenario, our study mainly focused on answering the following questions with the happiness scoring algorithm: </h2>
        <li> <a href=" #s2_1">Scenario 2.1:</a > What's the average happiness score of Australia as a baseline?</li>
        <li> <a href="#s2_2">Scenario 2.2:</a > What's the happiness score of each states?</li>
        <li> <a href="#s2_3">Scenario 2.3:</a > What's the happiness score of greater-capital-city-statistical-areas & the rest area?</li>
        <li> <a href="#s2_4">Scenario 2.4:</a > What's the happiness socre of suburbs and locations?</li>
    </section>

    <h1 id="s2_1">Scenario 2.1</h1>
    <section class = "s2_1">
      <h2 id="s2_1head">Unlocking the Australian Happiness: Average Score</h2>
      <h4>
      The average happiness score of Australia is{' '}
      <span id="bigNum">5.91526</span>
    </h4>
    < img id="au" src={au}/>
      <div className="Line">
        </div>
    </section>


    <h1 id="s2_2">Scenario 2.2</h1>
    <section class = "s2_2">
        <h2>Unveiling State's Happiness Across Australia</h2>
        <p>What's the happiness score of each states?</p>
          <h3 id="key">Key Findings:</h3>
          <p>Tasmania is the happiest state, while WA is {' '} 
          <span>the least happy state.</span>
          </p>
          <p>{' '}
          <span>Queensland, </span>and {' '}<span>Western Australia </span>
          have below-average happiness scores.</p>
          </section>
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
        <h1 id="s2_3">Scenario 2.3</h1>
    <section class = "s2_3">
        <div className="s2_3">
          <h2>Unveiling GCC's Happiness Across Australia</h2>
          <p>What's the happiness score of Greater Capital City Statistical Areas and the rest of the areas?</p>
          <h3 id="key">Key Findings:</h3>
            <li>{''}
            <span> Northern </span>
            West part of Australia is {" "} 
            <span id="key_yellow"> happier </span> 
            than the{" "} 
            <span> Southern East </span>part.</li>
            <li>Apart from Greater Darwin, for each state, the {" "}
            <span>Greater Capital Cities </span> 
             are 
             <span id="key_yellow"> happier </span>
             than the 
             <span>Rest Areas</span>
             .</li>
            <li>Places {""}
            <span id="key_yellow"> above </span>
              the Australia average happiness include: Greater Sydney, Rest of NSW, Greater Adelaide, Greater Hobart, Rest of Northern Territory, Australian Capital Territory.</li>
        </div>
            </section>
          <div className="histogram">
          <Bar
      options={options_his}
      data={{
        labels: data_histg.map((data_histg) => data_histg.name),
        datasets: [
            averageLineDataset,
          {
            label: "Great Capital Cities",
            data: data_histg.map((data_histg) => data_histg.score),
            backgroundColor: data_histg.map((data_histg) => data_histg.score > averageScore ? aboveAvgColor : belowAvgColor),
            borderWidth: 0.8,
          },
        ],
      }}
    />
        </div>
    </div>

  );
}

export default Scenario2;