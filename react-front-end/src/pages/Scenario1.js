import React, { useEffect, useState } from "react";
import "../style/Scenario1.css";
import { mean } from "lodash"
import { Line } from "react-chartjs-2";
import up from '../image/upward_arrow.png';
import upSun from '../image/sunup.png';
import downSun from '../image/sundown.png';
import week from '../image/weekend.png';
import { Bar } from 'react-chartjs-2';
import Footer from '../components/footer'; 

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
      text: "Happiness Score by Month",
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
        text: "Month",
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
  },
  elements: {
    // line: { showLine: true, borderWidth: 3, backgroundColor: "#9BD0F5" },
    point: {
      radius: 5,
      hoverRadius: 10, // to make it bigger when user hovers put larger number than radius.
    },
  },
};

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
        text: "Hours",
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
      min:5,
      max:7,
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
      text: "Happiness Score by Day of Week (Twitter)",
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
        text: "Day of Week",
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
      max:5.98,
      ticks: {
        font: {
          size: 15,
        },
        
      },
    },
  },
};

export const options_weekend_m = {
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
      text: "Happiness Score by Day of Week (Mastodon)",
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
        text: "Day of Week",
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
      min:5,
      max:6,
      ticks: {
        font: {
          size: 15,
        },
        
      },
    },
  },
};


export const options_his_2 = {
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
      text: "Happiness Score by hour (Mastodon)",
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
        text: "Hour",
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
      min:5.65,
      max:5.8,
      ticks: {
        font: {
          size: 15,
        },
        
      },
    },
  },
};


export const options_his_twitter = {
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
      text: "Happiness Score by hour (Twitter)",
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
        text: "Hour",
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
      min:5.7,
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
  const [data_weekend, setData_weekend] = useState([]);
  const [data_month, setDataMoth] = useState([]);
  const [data_mostdon, setDataMostodn] = useState([]);
  const [data_mostdon_week, setDataMostodnWeek] = useState([]);

	const weekDays = [null, null, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

	const data_mostdonH = data_mostdon.map(item => ({
		name: item.key,
		score: item.value.avg
	}));
  

	const averageScore_M = mean(data_mostdonH.map(item =>item.score))

	const averageLineDataset_M = {
		label: "Average Score from Mastodon",
		data: Array(data_mostdonH.length).fill(averageScore_M), // an array of the same length as the original data, all filled with the average score
		type: 'line', // this will be a line chart
		borderColor: "#808080", // line color
		borderWidth: 2, // line width
		fill: false, // don't fill under the line
	};

	const weekDays_m = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

	const data_mostdon_week_a = data_mostdon_week.map(item => ({
		name: weekDays_m[item.key],  
		score: item.value.avg
	}));

	const averageScore_M_w = mean(data_mostdon_week_a.map(item =>item.score))

	const averageLineDataset_M_w = {
		label: "Average Score from Mastodon",
		data: Array(data_mostdonH.length).fill(averageScore_M_w), // an array of the same length as the original data, all filled with the average score
		type: 'line', // this will be a line chart
		borderColor: "#808080", // line color
		borderWidth: 2, // line width
		fill: false, // don't fill under the line
	};

	const fetchData = () => {
		fetch(process.env.REACT_APP_BACKEND_URL + 's1_data')
		.then(response => response.json())
		.then(data => {
			if (!data.forwarding) { 
        let result_1 = data.result_1.length > 0 ? data.result_1 : [];
        let result_2 = data.result_2.length > 0 ? data.result_2 : [];
        let result_3 = data.result_3.length > 0 ? data.result_3 : [];
        let result_4 = data.result_4.length > 0 ? data.result_4 : [];
        let result_5 = data.result_5.length > 0 ? data.result_5 : [];
				setData(data.result_1);
				setData_weekend(data.result_3);
				setDataMoth(data.result_2);
				setDataMostodn(data.result_4);
				setDataMostodnWeek(data.result_5);
        
			} else {  
				fetch(process.env.REACT_APP_BACKEND_URL_2 + 's1_data')
				.then(response2 => {
						if (!response2.ok) { throw new Error('Network response from second backend was not ok') };
						return response2.json();
				})
				.then(data => {
					setData(data.result_1);
          setData_weekend(data.result_3);
          setDataMoth(data.result_2);
					setDataMostodn(data.result_4);
					setDataMostodnWeek(data.result_5);
				})
				.catch(error2 => {
					console.error('There has been a problem with your fetch operation from the second backend:', error2);
					const timer = setTimeout(fetchData, 30000);
					return () => clearTimeout(timer);
				});
			}
		})
		.catch(error => {
			console.error('There has been a problem with your fetch operation:', error);
      alert("The connection is broken")
		});
	};



	useEffect(() => {
		fetchData();
	}, []);
	const data_his = data.map(item => ({
			name: item.key,
			score: item.value.avg
	}));

	const averageScore_1 = mean(data_his.map(item =>item.score))

	const belowAvgColor = "#fddbc7"
	const aboveAvgColor = "#f4a582"

	const aboveAvgColor_m = "#34a8f7"
	const belowAvgColor_m = "#7bbdeb"

  // create a new dataset for the average line
  const averageLineDataset_1 = {
    label: "Average Score",
    data: Array(data_his.length).fill(averageScore_1), // an array of the same length as the original data, all filled with the average score
    type: 'line', // this will be a line chart
    borderColor: "#808080", // line color
    borderWidth: 2, // line width
    fill: false, // don't fill under the line
  };

  const data_week = data_weekend.map(item => ({
      name: weekDays[item.key],  
      score: item.value.avg
  }));

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

  const months = ['February', 'March', 'April', 'May', 'June', 'July', 'August'];

  const data_mon = data_month.map(item => ({
      name: months[item.key],  
      score: item.value.avg
  }));
  console.log("ahhahaha")
  console.log(data_mon)
  // const config: LineConfig_line = {
  //   data_mon,
  //   xField: 'name',
  //   yField: 'score',
  //   smooth: true,
  //   meta: {
  //     value: {
  //       max: 6
  //     }
  //   }
  // };
      
  return (
    <div class="container">
    <section class = "topic">
        <h1 id="head">Happiness & Time</h1> 
        <h2><i>Temporal Analysis with Twitter & Mastodon Data</i></h2>
        
        <p>This scenario involves temporal analysis, investigating happiness expressed on social media across different time period.</p >
        <h2>Analysis Goal </h2>
        <li> <a href="#s1_1">Scenario 1.1:</a > What's the happiness trend from 2022.2 to 2022.8 in Australia?</li>
        <li> <a href="#s1_2">Scenario 1.2:</a > What's the happiness trend by hour of a day in Australia and globally?</li>
        <li> <a href="#s1_3">Scenario 1.3:</a > What's the happiness trend by day of week in Australia and globally?</li>
    </section>

    <h1 id="s1_1">Scenario 1.1</h1>
    <section class = "s1_1">
        <div id="s1_1">
          <h2>Unveiling the Rising Happiness in Australia< img id="up" src={up}/></h2>
          <p>From March 2022 to June 2022, the happiness score of Australia exhibited an {""}
          <span id="key_yellow"> increasing </span>
          trend. </p>
        </div>
        </section>
      <div className="Line">
        {/* return <Line {...config} />; */}
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
      options={options_his_twitter}
      data={{
        labels: data_his.map((data_his) => data_his.name),
        datasets: [
            averageLineDataset_1,
          {
            label: "Score from Twitter",
            data: data_his.map((data_his) => data_his.score),
            backgroundColor: data_his.map((data_his) => data_his.score > averageScore_1 ? aboveAvgColor : belowAvgColor),
            borderWidth: 0.8,
          },
        ],
      }}
    />
    <Bar
      options={options_his_2}
      data={{
        labels: data_his.map((data_his) => data_his.name),
        datasets: [
          averageLineDataset_M,
          {
            label: "Score from Mastodon",
            data: data_mostdonH.map((data_mostdonH) => data_mostdonH.score), // data_week_2 是第二个数据集的数据
            backgroundColor: data_mostdonH.map((data_mostdonH) => data_mostdonH.score > averageScore_M ? aboveAvgColor_m : belowAvgColor_m),
            borderWidth: 0.8,
          },
        ],
      }}
    />

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
            label: "Score from Twitter",
            data: data_week.map((data_week) => data_week.score),
            backgroundColor: data_week.map((data_week) => data_week.score > averageScoreWeek ? aboveAvgColor : belowAvgColor),
            borderWidth: 0.8,
          },
        ],
      }}
    />
		<Bar
      options={options_weekend_m}
      data={{
        labels: data_mostdon_week_a.map((data_mostdon_week_a) => data_mostdon_week_a.name),
        datasets: [
          averageLineDataset_M_w,
          {
            label: "Score from Mastodon",
            data: data_mostdon_week_a.map((data_mostdon_week_a) => data_mostdon_week_a.score),
            backgroundColor: data_mostdon_week_a.map((data_mostdon_week_a) => data_mostdon_week_a.score > averageScore_M_w ? aboveAvgColor_m : belowAvgColor_m),
            borderWidth: 0.8,
          },
        ],
      }}
    />
      <Footer />
    </div>
  );
}

export default Scenario1;