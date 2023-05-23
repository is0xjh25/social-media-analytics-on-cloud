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
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    const delay = 5000; // 设置延时时间，单位为毫秒

    const timer = setTimeout(() => {
      // 设置显示图表的状态
      setShowChart(true);
    }, delay);

    return () => {
      // 清除定时器
      clearTimeout(timer);
    };
  }, []);

  const [showChart_1, setShowChart_1] = useState(false);

  useEffect(() => {
    const delay = 7000; // 设置延时时间，单位为毫秒

    const timer = setTimeout(() => {
      // 设置显示图表的状态
      setShowChart_1(true);
    }, delay);

    return () => {
      // 清除定时器
      clearTimeout(timer);
    };
  }, []);

  const [data, setData] = useState([]);
  const [data_weekend, setData_weekend] = useState([]);
  const [data_month, setDataMoth] = useState([]);
  const [data_mostdon, setDataMostodn] = useState([]);
  const [data_mostdon_week, setDataMostodnWeek] = useState([]);

	const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


  const data_mastodon_test_h =[{"key":0,"value":{"total":81088.79462840734,"count":14199,"avg":5.710880669653309}},
  {"key":1,"value":{"total":83284.43343493817,"count":14626,"avg":5.694272763225637}},
  {"key":2,"value":{"total":80056.20222439888,"count":14059,"avg":5.694302740194813}},
  {"key":3,"value":{"total":66588.21085356141,"count":11735,"avg":5.674325594679285}},
  {"key":4,"value":{"total":64733.848154890606,"count":11415,"avg":5.670945961882664}},
  {"key":5,"value":{"total":68400.3139442665,"count":12065,"avg":5.669317359657398}},
  {"key":6,"value":{"total":65544.90918388288,"count":11571,"avg":5.664584667175082}},
  {"key":7,"value":{"total":69730.89518786699,"count":12306,"avg":5.6664143659895165}},
  {"key":8,"value":{"total":69949.66749142214,"count":12292,"avg":5.690666082933789}},
  {"key":9,"value":{"total":69748.13519925482,"count":12246,"avg":5.695585105279668}},
  {"key":10,"value":{"total":62759.362233838736,"count":10991,"avg":5.710068440891524}},
  {"key":11,"value":{"total":79171.46933719359,"count":13838,"avg":5.721308667234686}},
  {"key":12,"value":{"total":62489.94288019993,"count":10910,"avg":5.727767450064155}},
  {"key":13,"value":{"total":52950.87310022446,"count":9243,"avg":5.728753986825106}},
  {"key":14,"value":{"total":47540.707989595016,"count":8311,"avg":5.720215135314043}},
  {"key":15,"value":{"total":39315.29402350577,"count":6868,"avg":5.724416718623438}},
  {"key":16,"value":{"total":47601.95910406849,"count":8354,"avg":5.698103795076429}},
  {"key":17,"value":{"total":53487.451514468376,"count":9368,"avg":5.709591323064515}},
  {"key":18,"value":{"total":50353.01908996658,"count":8791,"avg":5.727791956542667}},
  {"key":19,"value":{"total":51453.492270838986,"count":8942,"avg":5.754136912417691}},
  {"key":20,"value":{"total":54414.29333180432,"count":9447,"avg":5.759954835588474}},
  {"key":21,"value":{"total":65452.65197246897,"count":11348,"avg":5.767769824856272}},
  {"key":22,"value":{"total":79864.91317810948,"count":13913,"avg":5.74030857314091}},
  {"key":23,"value":{"total":69040.99134079856,"count":12016,"avg":5.745754938481904}}]



  const data_mastodon_test_week = [{"key":0,"value":{"total":33663.44579502255,"count":5763,"avg":5.84130588148925}},
  {"key":1,"value":{"total":147601.04998243257,"count":25465,"avg":5.796232082561656}},
  {"key":2,"value":{"total":214022.2517316696,"count":37911,"avg":5.645386608943832}},
  {"key":3,"value":{"total":540870.4473844974,"count":95507,"avg":5.6631497940935995}},
  {"key":4,"value":{"total":374266.88875339966,"count":65505,"avg":5.713562151796041}},
  {"key":5,"value":{"total":150052.41717455327,"count":25864,"avg":5.801593611759714}},
  {"key":6,"value":{"total":74545.33084839593,"count":12839,"avg":5.806163318669361}}]

	const data_mostdonH = data_mastodon_test_h.map(item => ({
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

	const data_mostdon_week_a = data_mastodon_test_week.map(item => ({
		name: weekDays_m[item.key],  
		score: item.value.avg
	}));
  console.log("testmmmmmm")
  console.log(data_mostdon_week_a)

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

  const data_tes_h = [
    {"key":0,"value":{"total":306213.7485550697,"count":51924,"avg":5.897345130480503}},
    {"key":1,"value":{"total":208900.521084395,"count":35483,"avg":5.887341010748669}},
    {"key":2,"value":{"total":150856.35123372197,"count":25596,"avg":5.893747118054461}},
    {"key":3,"value":{"total":120414.23256118428,"count":20423,"avg":5.896010995504298}},
    {"key":4,"value":{"total":117624.54860997015,"count":19830,"avg":5.93164642511196}},
    {"key":5,"value":{"total":171840.74274414772,"count":28904,"avg":5.945223593417787}},
    {"key":6,"value":{"total":315329.0849403237,"count":52955,"avg":5.954661220665163}},
    {"key":7,"value":{"total":511584.99499402085,"count":86259,"avg":5.930801365585282}},
    {"key":8,"value":{"total":662301.2359643742,"count":111886,"avg":5.919429025654453}},
    {"key":9,"value":{"total":706682.5679133122,"count":119429,"avg":5.917177301269476}},
    {"key":10,"value":{"total":688695.7628080943,"count":116338,"avg":5.919783413915439}},
    {"key":11,"value":{"total":685757.702772311,"count":115814,"avg":5.921198670042577}},
    {"key":12,"value":{"total":688363.9654981755,"count":116275,"avg":5.9201373080900925}},
    {"key":13,"value":{"total":682781.980858747,"count":115366,"avg":5.9183986690944215}},
    {"key":14,"value":{"total":664017.9494469492,"count":112137,"avg":5.9214884422353835}},
    {"key":15,"value":{"total":656557.5119162432,"count":110800,"avg":5.925609313323495}},
    {"key":16,"value":{"total":703099.810412009,"count":118690,"avg":5.923833603606108}},
    {"key":17,"value":{"total":757545.6069198756,"count":127712,"avg":5.931671314519196}},
    {"key":18,"value":{"total":811130.5202994025,"count":136665,"avg":5.93517374821207}},
    {"key":19,"value":{"total":851178.8576595016,"count":143458,"avg":5.933296558292334}},
    {"key":20,"value":{"total":867923.830467701,"count":146350,"avg":5.930466897626928}},
    {"key":21,"value":{"total":807761.7817595084,"count":136427,"avg":5.920835184820515}},
    {"key":22,"value":{"total":662717.9886998705,"count":111876,"avg":5.923683262718282}},
    {"key":23,"value":{"total":456948.485745718,"count":77240,"avg":5.915956573611057}}
    ]

    const data_mon_test = [
      {"key":0,"value":{"total":1231909.6911342407,"count":207992,"avg":5.922870548551102}},
      {"key":1,"value":{"total":2087333.5057895486,"count":353419,"avg":5.906115703427231}},
      {"key":2,"value":{"total":2299272.7175277295,"count":388273,"avg":5.9217939890946045}},
      {"key":3,"value":{"total":2557892.4773808643,"count":432370,"avg":5.915980473624129}},
      {"key":4,"value":{"total":2191732.996449306,"count":368919,"avg":5.940959930091175}},
      {"key":5,"value":{"total":2139818.4842335917,"count":360694,"avg":5.932503685211264}},
      {"key":6,"value":{"total":748269.9113493452,"count":126170,"avg":5.930648421568877}}
      ]

      const data_week_test = [{"key":0,"value":{"total":2013612.0270806267,"count":339782,"avg":5.926188047279217}},
      {"key":1,"value":{"total":1846288.1253987108,"count":312192,"avg":5.913950791175657}},
      {"key":2,"value":{"total":1698214.0467297146,"count":286868,"avg":5.919844830129937}},
      {"key":3,"value":{"total":1829760.3627939601,"count":309207,"avg":5.9175903611301175}},
      {"key":4,"value":{"total":1901797.179024065,"count":321322,"avg":5.918664700904591}},
      {"key":5,"value":{"total":1953417.27272686,"count":329154,"avg":5.934660592691749}},
      {"key":6,"value":{"total":2013140.770110691,"count":339312,"avg":5.9330078809788365}}
      ]


	useEffect(() => {
		// fetchData();
	}, []);
	const data_his = data_tes_h.map(item => ({
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

  const data_week = data_week_test.map(item => ({
      name: weekDays[item.key],  
      score: item.value.avg
  }));
  console.log("testtest")
  console.log(data_week)

  const averageScoreWeek = mean(data_week.map(item =>item.score))
  
	// create a new dataset for the average line
	const averageLineDatasetWeek = {
		label: "Average Score",
		data: Array(data_week_test.length).fill(averageScoreWeek), // an array of the same length as the original data, all filled with the average score
		type: 'line', // this will be a line chart
		borderColor: "#808080", // line color
		borderWidth: 2, // line width
		fill: false, // don't fill under the line
  };

  const months = ['February', 'March', 'April', 'May', 'June', 'July', 'August'];

  const data_mon = data_mon_test.map(item => ({
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
          {showChart && (
          <span id="key_yellow"> increasing </span>)}
          trend. </p>
        </div>
        </section>
      <div className="Line">
        {/* return <Line {...config} />; */}
        {showChart && (
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
        />)}
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
  {showChart && (
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
    />)}
    {showChart_1 && (
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
    />)}

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