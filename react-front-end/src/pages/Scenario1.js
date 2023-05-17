import React, { useEffect, useState } from "react";
import "../style/Scenario1.css";
import { mean } from "lodash"
import { Bar } from "react-chartjs-2";
import up from '../image/upward_arrow.png';
import upSun from '../image/sunup.png';
import downSun from '../image/sundown.png';
import week from '../image/weekend.png';
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

const data_line = []
// const data_line = [
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
const data_his=[]
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
      text: "Happiness Score of each Cities",
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
        text: "Gcc Names",
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
      min:5.75,
      max:6.1,
      ticks: {
        font: {
          size: 15,
        },
        
      },
    },
  },
};



export const options_weekend = {
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
      text: "Happiness Score of day of week",
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
        text: "Day",
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
      min:5.85,
      max:6,
      ticks: {
        font: {
          size: 15,
        },
        
      },
    },
  },
};










function Scenario1() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_URL + 'test1')
        .then(response => response.json())
        .then(data => {
            setData(data);

        });
    }, []);

    const data_his = data.map(item => ({
        name: item.key,
        score: item.value.avg
    }));
    console.log(data_his)

    const averageScore = mean(data_his.map(item =>item.score))

    const belowAvgColor = "#fddbc7"
    const aboveAvgColor = "#f4a582"

    // create a new dataset for the average line
    const averageLineDataset = {
    label: "Average Score",
    data: Array(data_his.length).fill(averageScore), // an array of the same length as the original data, all filled with the average score
    type: 'line', // this will be a line chart
    borderColor: "#808080", // line color
    borderWidth: 2, // line width
    fill: false, // don't fill under the line
  };

  const [data_weekend, setData_weekend] = useState([]);
    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_URL + 'gccWeekend')
        .then(response => response.json())
        .then(data_weekend => {
          setData_weekend(data_weekend);

        });
    }, []);

    const data_week = data_weekend.map(item => ({
         name: item.key + 1,
         score: item.value.avg
     }));
     console.log(data_week)

    const averageScoreWeek = mean(data_week.map(item =>item.score))


    // create a new dataset for the average line
    const averageLineDatasetWeek = {
    label: "Average Score",
    data: Array(data_weekend.length).fill(averageScoreWeek), // an array of the same length as the original data, all filled with the average score
    type: 'line', // this will be a line chart
    borderColor: "#808080", // line color
    borderWidth: 2, // line width
    fill: false, // don't fill under the line
  };


  const [data_month, setDataMoth] = useState([]);
    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_URL + 'gccMonth')
        .then(response => response.json())
        .then(data_month => {
          setDataMoth(data_month);
        });
    }, []);

    const data_mon = data_month.map(item => ({
      name: item.key,
      score: item.value.avg
  }));
  console.log(data_mon)
    
  
  
  

    
      
  return (
    <div class="container">
    <section class = "topic">
        <h1 id="head">Happiness & Time</h1> 
        <h2><i>Non-geo Analysis with Twitter Data</i></h2>
        
        <p>This scenario involves non-geo-related analysis, as we investigated people's happiness score across different time period.</p >
        <h2>In this scenario, our study mainly focused on answering the following questions: </h2>
        <li> <a href="#s1_1">Scenario 1.1:</a > What's the happiness trend from 2022.2 to 2022.8?</li>
        <li> <a href="#s1_2">Scenario 1.2:</a > What's the happiness trend by hour of a day?</li>
        <li> <a href="#s1_3">Scenario 1.3:</a > What's the happiness trend by day of week?</li>
        <li> <a href="#s1_4">Scenario 1.4:</a > What's the most frequent words related to happiness?</li>
    </section>

    <h1>Scenario 1.1</h1>
    <section class = "s1_1">
        <div id="s1_1">
          <h2>Unveiling the Rising Happiness in Australia< img id="up" src={up}/></h2>
          <p>From March 2022 to June 2022, the happiness score of Australia exhibited an {""}
          <span id="key_yellow"> increasing </span>
          trend. </p>
        </div>
        </section>
      <div className="Line">
      <Line
          options={options_line}
          data={{
            labels: data_mon.map((data_mon) => data_mon.name),
            datasets: [
              {
                label: "Frequency",
                data: data_mon.map((data_mon) => data_mon.score),
                backgroundColor: "#C2847A",
                borderWidth: 2,
                borderColor: "#625B57",
              },
            ],
          }}
        />
        </div>

    <h1 id="s1_2">Scenario 1.2</h1>
    <section class = "s1_2">
    <h2 >< img id="sun" src={upSun}/>Journey of Happiness Throughout the Day < img id="sun" src={downSun}/></h2>
    <h4>Happiness score peaked at early morning, and gradually {" "}
      <span id="key_green">decreases </span>
      during in the day.
        At around 6 PM, the happiness score {""}
        <span id="key_yellow">rose </span>
        again to a small peak.</h4>
    <div className="histogram">
    </div>
  </section>
  <Bar
      options={options_his}
      data={{
        labels: data_his.map((data_his) => data_his.name),
        datasets: [
            averageLineDataset,
          {
            label: "Frequency",
            data: data_his.map((data_his) => data_his.score),
            backgroundColor: data_his.map((data_his) => data_his.score > averageScore ? aboveAvgColor : belowAvgColor),
            borderWidth: 0.8,
          },
        ],
      }}
    />
);

<h1 id="s1_3">Scenario 1.3</h1>
    <section class = "s1_3">
        <div>
          <h2>Weekend Bliss: Higher Happiness Scores < img id="week" src={week}/></h2>
          <p>During the weekends, the happiness scores reach higher levels, creating a blissful experience.</p>
        </div>
    </section>
    <Bar
      options={options_weekend}
      data={{
        labels: data_week.map((data_week) => data_week.name),
        datasets: [
            averageLineDatasetWeek,
          {
            label: "Frequency",
            data: data_week.map((data_week) => data_week.score),
            backgroundColor: data_week.map((data_week) => data_week.score > averageScoreWeek ? aboveAvgColor : belowAvgColor),
            borderWidth: 0.8,
          },
        ],
      }}
    />
    <section class = "s1_4">
        <h1 id="s1_4">Scenario 1.4</h1>
      <h4>babababababababa</h4>
    </section>
    </div>

  );
}

export default Scenario1;