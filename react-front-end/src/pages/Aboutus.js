import algorithm from '../image/algorithm.png';
import happydb from '../image/happydb.png';
import score from '../image/score.png';
const Aboutus = () => {

  return (
    <div class="container">
        <h1>About Us</h1>
        <p>This project is developed by Yun-Chi Hsiao, Jiahe Liu, Benjamin Murdoch, Jongho Park, Yongli Qin. We are Master students @Unimelb</p>
        <h2>Our Roles</h2>
        Aesthetic Full-stack Developer: Yongli<br></br>
        Docker Master & Linux Master: Jongho<br></br>
        ProAnsible Player & 101% Introvert: Yun-Chi<br></br>
        The King of MRC & Linux Master: Benjamin Murdoch<br></br>
        Amazing Data Analyst: Jiahe

        <h1>Happiness Score</h1>
        <h2>Quantifying Happiness on Social Media</h2>
        <p>Studies have developed algorithm to quantify happiness based on a piece of text using human evaluations by
           crowdsourcing. Dodds et al. used Amazon Mechanical Turk to ask the crowd to rate the most frequently used 
           words on Twitter, Google, New York Times, and Lyrics in terms of happiness. <br></br>
       <div style={{ display: 'flex', justifyContent: 'center' , padding: '20px', background: "rgb(0,0,0,0.1)"}}>
          <div>
            <a href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0026752" target="_blank">
              <img src={score} alt="study" style={{ width: '1600px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'}} />
            </a>
          </div>
          
          <div  style={{ margin: '30px', }}>
          <h2>Happiness Rated by Crowdsourcing</h2>
          In total, 10,223 words were rated from the range of 1 (saddest) to 9 (happiest) where 
           one word will be evaluated by 50 individuals and for an averaged score.
            With this measurement index, average happiness score of a corpus or text can be calculated by summing 
            the weighted happiness score of each words in the corpus or text. 
            </div>
        </div></p>
            <div style={{ display: 'flex', justifyContent: 'center' , padding: '20px',background: "rgb(0,0,0,0.1)"}}>

          <div  style={{ margin: '50px'}}>
          <h2>Happiness Algorithm</h2>
          <p>The example demonstrates the calculation process of happiness score for "I had a very very nice brunch". </p>
          </div>
          <div>
            <a href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0026752" target="_blank">
              <img src={algorithm} alt="study" style={{ width: '1600px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }} />
            </a>
          </div>
          
        </div>
        <h1>Classify Reasons for Happiness</h1>
        <h2>A Classification Machine Learning Model - Logistic Regression </h2>
        <p>
        Additionally, an NLP study classified happiness into 7 categories: achievement, affection, bonding, enjoy the moment, exercises, leisure, and nature. HappyDB project 
        crowdsourced 100,000 happy moments and labelled each moments with the proposed categories.
        <div style={{ display: 'flex', justifyContent: 'center',padding: '20px' }}>
        <div>
            <a href="https://megagon.ai/happydb-a-happiness-database-of-100000-happy-moments/" target="_blank">
              <img src={happydb} alt="study" style={{ width: '700px'}} />
            </a>
          </div>
          </div>
        </p>
    </div>
  );
};

export default Aboutus;

