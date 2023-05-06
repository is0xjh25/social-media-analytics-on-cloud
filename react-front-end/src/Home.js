import React from 'react';
import "./style/Home.css";
import Typed from 'react-typed';

function Home() {
  return (
    <div className="root-container">
      <div className="container1" style={{ display: 'flex' ,flex:"1"}}>
        <div className="col-4" style={{ backgroundColor: '#F7DBA7', flex: '1' }}>
          <h1 className="ml11">
            <span className="text-wrapper" style={{ overflow: 'hidden', width: '100%', overflowWrap: 'break-word'}}>
          <Typed
            strings={["I was able to go to a restaurant that I like."]}
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
              strings = {["Having a Great Day hahhahahahah!"]}     
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

      <div id="grad1">
        <section className="texts">
          <h1>Overview</h1>
          <p>
            This web application will demonstrate the visualized analysis results of sentimental analysis on Twitter
            and Mastodon data.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Home;
