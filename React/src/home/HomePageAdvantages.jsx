import React from 'react';
import './StyleHomePage.css'


function HomePageAdvantages() {
  return (
    <>
      <div className="centered-text">
        <h1 >Advantages of a Collaborative Dilemma Platform</h1>
      </div>
      <section id="homePage-five" className="homePage-goblack" style={{ marginTop: "0", paddingTop: "0" }} >


        <div style={{ display: 'flex', position: 'center' }}>
          <div className="advantage-container" >

            <div className="advantage-mobile-layout">
              <div className="advantage-notification-header">

                <div className="advantage-necessities">
                  <i className="advantage-fas fa-signal"></i>
                  <i className="advantage-fas fa-wifi"></i>
                  <i className="advantage-fas fa-battery-full"></i>
                </div>
              </div>
              <div className="advantage-actions">
                <i className="advantage-fas fa-chevron-left"></i>
                <i className="advantage-fas fa-bookmark"></i>
              </div>
              <div className="advantage-book-cover">
                <img className="advantage-book-top" src="images/ebe45aa4bc532a6dbb9a4cee75f44130.jpg" alt="book-top" />

              </div>
              <div className="advantage-preface">
                <div className="advantage-content">
                  <div className="advantage-header">
                    <div className="advantage-title" style={{ paddingBottom: '20%' }}>First advantage</div>
                    <div className="advantage-icon">
                      <i className="advantage-fas fa-chevron-down"></i>
                    </div>
                  </div>
                  <div className="advantage-body">
                    <p>
                      <b> Diverse Opinions:</b>

                      Advantage: An open platform allows users from various backgrounds to share their perspectives.
                      Explanation: Think of a place where everyone shares their viewpoint. This enriches the decision-making process and brings a broad, diverse perspective.
                    </p>

                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* // 2 */}
          <div className="advantage-container">

            <div className="advantage-mobile-layout">
              <div className="advantage-notification-header">

                <div className="advantage-necessities">
                  <i className="advantage-fas fa-signal"></i>
                  <i className="advantage-fas fa-wifi"></i>
                  <i className="advantage-fas fa-battery-full"></i>
                </div>
              </div>
              <div className="advantage-actions">
                <i className="advantage-fas fa-chevron-left"></i>
                <i className="advantage-fas fa-bookmark"></i>
              </div>
              <div className="advantage-book-cover">
                <img className="advantage-book-top" src="images/ebe45aa4bc532a6dbb9a4cee75f44130.jpg" />

              </div>
              <div className="advantage-preface">
                <div className="advantage-content">
                  <div className="advantage-header">
                    <div className="advantage-title" style={{ paddingBottom: '20%' }}>Second advantage</div>
                    <div className="advantage-icon">
                      <i className="advantage-fas fa-chevron-down"></i>
                    </div>
                  </div>
                  <div className="advantage-body">
                    <p>
                      <b>Community Engagement:</b>
                      Advantage: Each like you give contributes to your personal points in the system.
                      Explanation: Users who help determine the winning answers receive additional points, encouraging engagement and a desire to help others.
                    </p>

                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3 */}
          <div className="advantage-container">

            <div className="advantage-mobile-layout">
              <div className="advantage-notification-header">

                <div className="advantage-necessities">
                  <i className="advantage-fas fa-signal"></i>
                  <i className="advantage-fas fa-wifi"></i>
                  <i className="advantage-fas fa-battery-full"></i>
                </div>
              </div>
              <div className="advantage-actions">
                <i className="advantage-fas fa-chevron-left"></i>
                <i className="advantage-fas fa-bookmark"></i>
              </div>
              <div className="advantage-book-cover">
                <img className="advantage-book-top" src="images/ebe45aa4bc532a6dbb9a4cee75f44130.jpg" alt="book-top" />

              </div>
              <div className="advantage-preface">
                <div className="advantage-content">
                  <div className="advantage-header">
                    <div className="advantage-title" style={{ paddingBottom: '20%' }}>Third advantage</div>
                    <div className="advantage-icon">
                      <i className="advantage-fas fa-chevron-down"></i>
                    </div>
                  </div>
                  <div className="advantage-body">
                    <p>
                      <b>Recognition Opportunity:</b>

                      Advantage: Each like you give contributes to your personal points in the system.
                      Explanation: Users who help determine the winning answers receive additional points, encouraging engagement and a desire to help others.
                    </p>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePageAdvantages;