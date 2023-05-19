import study from '../image/study.png';
import study2 from '../image/study2.png';
const Aboutus = () => {

  return (
    <div class="container">
        <h1>About Us</h1>
        <p>We are Master students @Unimelb</p>
        <h1>Happiness Score</h1>
        <p>Studies have developed algorithm to quantify happiness based on a piece of text using human evaluations by
           crowdsourcing. Dodds et al. used Amazon Mechanical Turk to ask the crowd to rate the most frequently used 
           words on Twitter, Google, New York Times, and Lyrics in terms of happiness. <br></br>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div>
            <a href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0026752" target="_blank">
              <img src={study} alt="study" style={{ width: '300px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }} />
              <p style={{ marginTop: '10px', textAlign: 'center' }}>Happiness and the Patterns of Life: A Study of Geolocated Tweet</p>
            </a>
          </div>
          <div>
            <a href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0026752" target="_blank">
              <img src={study2} alt="study" style={{ width: '300px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }} />
            </a>
          </div>
        </div>


           In total, 10,223 words were rated from the range of 1 (saddest) to 9 (happiest) where 
           one word will be evaluated by 50 individuals and for an averaged score.
            With this measurement index, average happiness score of a corpus or text can be calculated by summing 
            the weighted happiness score of each words in the corpus or text. </p>
        <h1>Classify Reasons for Happiness</h1>
        <p>
        Additionally, an NLP study classified happiness into 7 categories: achievement, affection, bonding, enjoy the moment, exercises, leisure, and nature. HappyDB project 
        crowdsourced 100,000 happy moments and labelled each moments with the proposed categories.
        </p>
    </div>
  );
};

export default Aboutus;

