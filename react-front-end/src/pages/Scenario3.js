import React from "react";
import "../style/Scenario3.css";
import correlation from '../image/correlation.png';

function Scenario3() {
  return (
    <div class="container">
    <section class = "topic">
        <h1>Discover Influential Factors</h1> 
        <h2><i>Correlation Analysis between Twitter Data & SUDO Data</i></h2>
        
        <p>This scenario involves geo-related analysis, as we investigated people's happiness score across different locations in Australia. 
          Australian Statistical Geography Standard (ASGS) was used for statistical areas reference. Among the statistical standards, we used 
          Statistical Areas Level 4 (i.e.  Greater Capital City Statistical Areas), and 
          Non ABS Structures (i.e.  Suburbs and Localities).
        </p >
        <h2>In this scenario, our study mainly focused on answering the following questions with the happiness scoring algorithm: </h2>
        <li> <a href="#s3_1">Scenario 3.1:</a > What are the social factors potentially influencing happiness score?</li>
        <li> <a href="#s3_2">Scenario 3.2:</a > What are the economic factors potentially influencing happiness score?</li>
    </section>
    


    <h1 id="s3.1">Scenario 3.1 Social Factors</h1>
    <section class = "s3_1">
    <a name="s3.1"></a>
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
    </div>

  );
}

export default Scenario3;