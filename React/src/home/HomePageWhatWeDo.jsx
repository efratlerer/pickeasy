import React from 'react';
import './StyleHomePage.css'


function HomePageWhatWeDo() {
  return (
    <>
      <section id="homePage-two">
        <div className="homePage-heading">
          <h1>How It Works</h1>
          <p className="homePage-lightblack">
            Discover the magic of getting community feedback on various dilemmas. Here’s how the process works:
          </p>
        </div>

        <div className="homePage-container">
          <div className="homePage-info">
            <span>
              <img src="images/writeOffer.png" alt="" style={{ height: '220px' }} />
            </span>
            <div className="homePage-info__text">
              <h1>Post a Question</h1>
              <p>Need help making a decision? Post a question on a topic that interests you, and add images that illustrate your options. Easily receive feedback from the community..</p>
              <h5 className="homePage-" style={{ color: " #FAAE3E" }}>step 1</h5>
            </div>
          </div>


          <div className="homePage-info">
            <span>
              <img style={{ height: '200px', width: "90%" }} src="images/זמן.jpeg" alt="" />
            </span>
            <div className="homePage-info__text">
              <h1>Set a Deadline</h1>
              <p>Choose a timeframe to receive answers, whether it’s an hour or a week. Once the time is up, you’ll get an email update with the top answer, based on community votes.
              </p>
              <h5 className="homePage-" style={{ color: " #FAAE3E" }}>step 2</h5>
            </div>
          </div>

          <div className="homePage-info">
            <span>
              <img src="images/white man.jpg" alt="" style={{ height: '220px', width: "90%" }} />
            </span>
            <div className="homePage-info__text">
              <h1>Receive Ratings</h1>
              <p>Community members can like their preferred images in your question. When the deadline arrives, the image with the highest number of likes will be displayed as the top choice.</p>
              <h5 className="homePage-" style={{ color: " #FAAE3E" }}>step 3</h5>
              Get Started Now!
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePageWhatWeDo;