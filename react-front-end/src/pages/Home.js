import React from 'react';
import "../style/Home.css"
import Typed from 'react-typed';
import logo4 from '../image/logo4.png';
import logo5 from '../image/logo5.png';
import logo6 from '../image/logo6.png';
import logo7 from '../image/logo7.png';
import logo8 from '../image/logo8.png';
import logo9 from '../image/logo9.png';

function Home() {
  return (
    <div className="root-container">
      <div className='top'>
      <div className="container1" style={{ display: 'flex' ,flex:"1"}}>
        <div className="col-4" style={{ backgroundColor: '#F7DBA7', flex: '1' }}>
          <h1 className="ml11">
            <span className="text-wrapper" style={{ overflow: 'hidden', width: '100%', overflowWrap: 'break-word'}}>
          <Typed
            strings={["I was so happy"]}
            typeSpeed={200}
            loop
          />
        </span>
          </h1>
        </div>
        <div className="col-4" style={{ backgroundColor: '#F1AB86', flex: '1' }}>
          <h1 className="ml6">
            <span className="text-wrapper">
              <span className="letters_2_2">"Got A in class."</span>
            </span>
          </h1>
        </div>
        <div className="col-4" style={{ backgroundColor: '#c57b57', flex: '1' }}>
          <h1 className="ml7">
            <span className="text-wrapper" style={{ overflow: 'hidden', width: '100%' ,overflowWrap: 'break-word' }} >
                <Typed
              strings = {["Having a Great Day!"]}     
                typeSpeed={150} 
                loop
               />
            </span>
          </h1>
        </div>
      </div>
        
      <div className="row" style={{ backgroundColor: '#444140',flex:"1"}}>
        <header
          style={{
            color: 'white',
            fontSize: '2em',
            paddingTop: '1em',
            paddingLeft: '1em',
            paddingRight: '1em',
            paddingBottom: '1em',
          }}
        >
          <h1>Happiness Mining</h1>
          <h4>
            <i>A sentimental analysis on Tweets and Mastodons</i>
          </h4>
        </header>
      </div>
      <div className="container2" style={{ display: 'flex' ,flex:"1"}}>
  <div className="row" style={{ display: 'flex' }}>
    <div className="col" style={{ backgroundColor: '#ffc09f', flex: '1' }}>
      <h1 className="ml7">
        <span className="text-wrapper" style={{ overflow: 'hidden', width: '100%', overflowWrap: 'break-word'}}>
          <Typed
            strings={["Get a new bicycle."]}
            typeSpeed={200}
            loop
          />
        </span>
      </h1>
    </div>
    <div className="col" style={{ backgroundColor: '#C2847A', flex: '1' }}>
      <h1 className="ml10">
        <span className="text-wrapper">
          <span className="letters_2">"My son gave me a big hug in the morning when I woke him up."</span>
        </span>
      </h1>
    </div>
    <div className="col" style={{ backgroundColor: '#E4C5AF', flex: '1' }}>
      <h1 className="ml3">
        <span className="text-wrapper">
          <span className="line line1"></span>
          <span className="letters_1">
            "I went on a successful date with someone I felt sympathy and connection with."
          </span>
        </span>
      </h1>
    </div>
  </div>
</div>
</div>

      <div id="grad1">
        <section className="texts_1">
          <h1 id="overview">Overview</h1>
          <p>This web application demonstrates the visualized analysis results of sentiment analysis on Twitter and Mastodon data. The main goal of this project is to analyze the "happiness" indicated from social media behaviors. To quantify the "happiness" of a text posted on social media, we used a happiness score algorithm referenced from (Dodds etal., 2011). In total, we analyzed the "happiness" of 1,807,963 geo located Twitter data.</p>
          <p>This website will tell the story of happiness followed by four scenarios:</p>
        </section>

        <div class="container1_2">
        < img src={logo4} id="logo4"/>
        <div id="text_2">
                <h1 id='overview'>Discovering Temporal Trends of Happiness in Australia</h1>
                <li>Are people beaming with more happiness during specific months?</li>
                    <li>Does morning or night bring more joy?</li>
                    <li>Do weekends bring more happiness to people's lives?</li>
                    </div>
            </div>
        <div class="container1_2">
        <div id="text_2_2">
                <h1 id='overview'>Unveiling Happiness Across Australia</h1>
                <li>Which states in Australia are the happiest according to social media?</li>
                    <li>Unraveling the Secrets of Greater Capital Cities: Do They Hold the Key to Happiness?</li>
                    <li>Is there a significant difference in happiness between the eastern and western parts of Australia?</li>
                    </div>
                    < img src={logo6} id="logo6"/>
            </div>
            <div class="container1_2">
        < img src={logo7} id="logo7"/>
        <div id="text_2">
                <h1 id='overview'>Secrets for Happiness</h1>
                <li>Is happiness found in the absence of marriage?</li>
                    <li>Does unemployment bring unexpected happiness?</li>
                    <li>How does higher education influence happiness?</li>
                    <li>What types of joyful moments are people most inclined to share on social media?</li>
                    </div>
            </div>

            <div class="container1_2">
        <div id="text_2_2">
                <h1 id='overview'>Happiness - Australia vs the World</h1>
                <li>How does the happiness level of Australia's Tweets compare to the global average?</li>
                    <li>Are there different temporal trends in happiness between Australia and the rest of the world?</li>
                    </div>
                    < img src={logo8} id="logo8"/>
            </div>

      </div>
    </div>
  );
}

export default Home;
