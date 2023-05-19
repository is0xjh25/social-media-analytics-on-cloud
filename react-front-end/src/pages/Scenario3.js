import React ,{ useEffect, useState }from "react";
import "../style/Scenario3.css";
import correlation from '../image/correlation.png';
import { Line } from '@pansy/react-charts';
import { LineConfig } from '@pansy/react-charts/es/line';

function Scenario3() {

  const [data, setData] = useState([]);


  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL + 'mastodon_b')
    .then(response => {
        if (!response.ok) { throw new Error('Network response was not ok') };
        return response.json();
    })
    .then(data => {
        if (!data.state) { 
            setData(data);
        } else {  
            fetch(process.env.REACT_APP_BACKEND_URL + 'mastodon_b')
            .then(response2 => {
                if (!response2.ok) { throw new Error('Network response from second backend was not ok') };
                return response2.json();
            })
            .then(data => {
                setData(data);
            })
            .catch(error2 => {
                console.error('There has been a problem with your fetch operation from the second backend:', error2);
                // window.alert("Connection to the second backend is broken");
            });
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        // window.alert("Connection is broken");
    });
  }, []);
  const weekDays_m = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const data_used = data.map(item => ({
    name: item.key[1],
    year: weekDays_m[item.key[0]], 
    gdp: Math.log(item.value)
    // value: item.value
  }));
  console.log("aaaaaaaaaaaaa")
  console.log(data_used)


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
          duration: 20000
        }
      }
    };
    



  return (
    <div class="container">
    <section class = "topic">
        <h1 id="head">Discover Influential Factors</h1> 
        <h2><i>Correlation Analysis between Twitter Data & SUDO Data</i></h2>
        
        <p>This scenario involves geo-related analysis, as we investigated people's happiness score across different locations in Australia. 
          Australian Statistical Geography Standard (ASGS) was used for statistical areas reference. Among the statistical standards, we used 
          Statistical Areas Level 4 (i.e.  Greater Capital City Statistical Areas), and 
          Non ABS Structures (i.e.  Suburbs and Localities).
        </p >
        <h2>In this scenario, our study mainly focused on answering the following questions with the happiness scoring algorithm: </h2>
        <li> <a href="#s3_1">Scenario 3.1:</a > What are the social factors potentially influencing happiness score?</li>
        <li> <a href="#s3_2">Scenario 3.2:</a > What are the economic factors potentially influencing happiness score?</li>
        <li> <a href="#s3_3">Scenario 3.3:</a > How can reasons for happiness be classified?</li>
    </section>
    


    <h1 id="s3_1">Scenario 3.1 Social Factors</h1>
    <section class = "s3_1">
    <a name="s3_1"></a>
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


    <h1 id="s3_2">Scenario 3.2 Economic Factors</h1>
    <section class = "s3_2">
          <h2>Exploring the Economic Factors to Happiness</h2>
          <p>How are unemployment rate, labor force participation, weekly rent, weekly income by family, and weekly income by individual connected to happiness?</p>
          <h3 id="key">Key Findings:</h3>
            <li>The unemployment rate is {""}
              <span id = "key_yellow">positively correlated  </span>
              with happiness.</li>
            <li>However, labor force participation, weekly rent, weekly income by family, and weekly income by individual are negatively correlated  with happiness.</li>
    </section>

    <h1 id="s3_3">Scenario 3.3 Classify Reasons for Happiness</h1>
    <section class = "s3_2">
          <h2>Use Logistic Regression Model to Label Reasons for Happiness</h2>
          <p>Is happiness attributed to achievement, affection, bonding, enjoy-the-moment, exercise, leisure, or nature?</p>
          <h3 id="key">Key Findings:</h3>
          <Line {...config} />

    </section>
    </div>

  );
}

export default Scenario3;


