import React ,{ useEffect, useState }from "react";
import "../style/Scenario3.css";
import correlation from '../image/correlation.png';
import { Line } from '@pansy/react-charts';
import { LineConfig } from '@pansy/react-charts/es/line';
import Footer from '../components/footer'; 

function Scenario3() {
  const [showChart, setShowChart] = useState(false);
  useEffect(() => {
    const delay = 3000; // 设置延时时间，单位为毫秒

    const timer = setTimeout(() => {
      // 设置显示图表的状态
      setShowChart(true);
    }, delay);

    return () => {
      // 清除定时器
      clearTimeout(timer);
    };
  }, []);

  const [data, setData] = useState([]);
  const fetchData = () => {
  	fetch(process.env.REACT_APP_BACKEND_URL + 's3_data')
    .then(response => response.json())
    .then(data => {
      if (!data.forwarding) { 
        setData(data.result);
      } else {  
        fetch(process.env.REACT_APP_BACKEND_URL_2 + 's3_data')
        .then(response2 => {
            if (!response2.ok) { throw new Error('Network response from second backend was not ok') };
            return response2.json();
        })
        .then(data => {
            setData(data.result);
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
    });
  };
  console.log("s3 data")
  console.log(data)
  useEffect(() => {
    fetchData();
  }, []);

  const data_test_be = [{"key":[0,"achievement"],"value":5039},
  {"key":[0,"affection"],"value":280},
  {"key":[0,"bonding"],"value":39},
  {"key":[0,"enjoy_the_moment"],"value":355},
  {"key":[0,"exercise"],"value":1},
  {"key":[0,"leisure"],"value":39},
  {"key":[0,"nature"],"value":10},
  {"key":[1,"achievement"],"value":22152},
  {"key":[1,"affection"],"value":1323},
  {"key":[1,"bonding"],"value":163},
  {"key":[1,"enjoy_the_moment"],"value":1595},
  {"key":[1,"exercise"],"value":8},
  {"key":[1,"leisure"],"value":196},
  {"key":[1,"nature"],"value":28},
  {"key":[2,"achievement"],"value":33469},
  {"key":[2,"affection"],"value":1726},
  {"key":[2,"bonding"],"value":238},
  {"key":[2,"enjoy_the_moment"],"value":2134},
  {"key":[2,"exercise"],"value":12},
  {"key":[2,"leisure"],"value":271},
  {"key":[2,"nature"],"value":61},
  {"key":[3,"achievement"],"value":84858},
  {"key":[3,"affection"],"value":4326},
  {"key":[3,"bonding"],"value":528},
  {"key":[3,"enjoy_the_moment"],"value":5038},
  {"key":[3,"exercise"],"value":19},
  {"key":[3,"leisure"],"value":625},
  {"key":[3,"nature"],"value":113},
  {"key":[4,"achievement"],"value":57695},
  {"key":[4,"affection"],"value":3128},
  {"key":[4,"bonding"],"value":404},
  {"key":[4,"enjoy_the_moment"],"value":3750},
  {"key":[4,"exercise"],"value":8},
  {"key":[4,"leisure"],"value":457},
  {"key":[4,"nature"],"value":63},
  {"key":[5,"achievement"],"value":22621},
  {"key":[5,"affection"],"value":1199},
  {"key":[5,"bonding"],"value":166},
  {"key":[5,"enjoy_the_moment"],"value":1656},
  {"key":[5,"exercise"],"value":9},
  {"key":[5,"leisure"],"value":176},
  {"key":[5,"nature"],"value":37},
  {"key":[6,"achievement"],"value":11041},
  {"key":[6,"affection"],"value":657},
  {"key":[6,"bonding"],"value":95},
  {"key":[6,"enjoy_the_moment"],"value":919},
  {"key":[6,"exercise"],"value":2},
  {"key":[6,"leisure"],"value":103},
  {"key":[6,"nature"],"value":22}]

  const weekDays_m = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const data_used = data_test_be.map(item => ({
    name: item.key[1],
    year: weekDays_m[item.key[0]], 
    gdp: Math.log(item.value)
  }));

  data_used.forEach((item, index) => {
    if (typeof item.gdp !== 'number') {
      console.error('Invalid gdp at index:', index, 'value:', item.gdp);
    }
  });
    
    
  const config: LineConfig = {
    data: data_used,
    xField: 'year',
    yField: 'gdp',
    seriesField: 'name',
    yAxis: { label: { formatter: (v) => `${v}` } },
    legend: { position: 'top' },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration:6000
      }
    }
  };
    



  return (
    <div class="container">
    <section class = "topic">
        <h1 id="head">Discover Influential Factors</h1> 
        <h2><i>Correlation Analysis between Twitter Data & SUDO Data</i></h2>
        
        <p>This scenario involves correlation Analysis 
        In the third scenario, a correlation analysis was performed to identify the social and economic factors significantly influencing happiness levels 
        in different regions of Australia.
        </p >
        <h2>Analysis Goal</h2>
        <li> <a href="#s3_1">Scenario 3.1:</a > What are the social factors potentially influencing happiness score?</li>
        <li> <a href="#s3_2">Scenario 3.2:</a > What are the economic factors potentially influencing happiness score?</li>
        <li> <a href="#s3_3">Scenario 3.3:</a > How can reasons for happiness be classified?</li>
    </section>
    
    <h1 id="s3_1">Scenario 3.1 Classify Reasons for Happiness</h1>
    <section class = "s3_1">
          <h2>Use Logistic Regression Model to Label Reasons for Happiness</h2>
          <p>Is happiness attributed to achievement, affection, bonding, enjoy-the-moment, exercise, leisure, or nature?</p>
          <h3 id="key">Key Findings:</h3>
          <p>Most Mastodon posts were tagged with "achievement" whilst least posts were tagged with "exercise"</p>
          <Line {...config} />

    </section>

    <h1 id="s3_2">Scenario 3.2 Social Factors</h1>
    <section class = "s3_2">
    <a name="s3_2"></a>
            <h2>Exploring the Social Factors to Happiness</h2>
            <p>Do population, age, marriage, household size, and education impact our happiness?</p>
            <h3 id="key">Key Findings:</h3>
              <li>No-marriage, household size, and education are {""}
              <span id="key_yellow">positively correlated </span>
                with happiness.</li>
              <li>On the other hand, age is {" "}
                <span id = "key_normal">negatively correlated </span>
                with happiness.</li>
    </section>
    < img src={correlation}/>


    <h1 id="s3_3">Scenario 3.3 Economic Factors</h1>
    <section class = "s3_3">
    <a name="s3_3"></a>
          <h2>Exploring the Economic Factors to Happiness</h2>
          <p>How are unemployment rate, labor force participation, weekly rent, weekly income by family, and weekly income by individual connected to happiness?</p>
          <h3 id="key">Key Findings:</h3>
            <li>The unemployment rate is {""}
              <span id = "key_yellow">positively correlated  </span>
              with happiness.</li>
            <li>However, labor force participation, weekly rent, weekly income by family, and weekly income by individual are <span id = "key_normal">negatively correlated </span> with happiness.</li>
    </section>
    <Footer />
    </div>

  );
}

export default Scenario3;


