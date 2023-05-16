import React from "react";
import "../style/Scenario1.css";

function Scenario3() {
  return (
    <div class="container">
    <section class = "topic">
        <h1>Discover Influential Factors</h1> 
        <h3><i>Correlation Analysis between Twitter Data & SUDO Data</i></h3>
        
        <p>This scenario involves geo-related analysis, as we investigated people's happiness score across different locations in Australia. 
          Australian Statistical Geography Standard (ASGS) was used for statistical areas reference. Among the statistical standards, we used 
          Statistical Areas Level 4 (i.e.  Greater Capital City Statistical Areas), and 
          Non ABS Structures (i.e.  Suburbs and Localities).
        </p >
        <h3>In this scenario, our study mainly focused on answering the following questions with the happiness scoring algorithm: </h3>
        <li> <a href=" ">Scenario 2.1:</a > What are the social factors potentailly influencing happiness score?</li>
        <li> <a href="#s3.2">Scenario 2.2:</a > What are the econimic factors potentailly influencing happiness score?</li>
    </section>


    <section class = "s3.1">
        <h1 id="s3.1">Scenario 3.1</h1>
      <h4>The average happiness score of Australia is 5.91526.</h4>
      <div className="Line">
        </div>
    </section>


    <section id = "s3.2">
        <h1 id="s3.2">Scenario 3.2</h1>
    </section>
    </div>

  );
}

export default Scenario3;