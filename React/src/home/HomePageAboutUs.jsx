import React from 'react';


function HomePageAboutUs() {

  return (
    <>
      <section id="homePage-one-half" className="homePage-goblack" style={{ marginBottom: '0', paddingBottom: '0' }}>
        <span style={{ margin: '0', padding: '0' }}><img src="images/1000_F_52130924_ORk5aispmh8x49aLk8Jbdo8bYOLEnO42.jpg" alt="" style={{ height: '50%' }} /></span>

        <div className="homePage-half-content">
          <div className="homePage-half__text">
            <h1>About Us</h1>
            <p>
              <strong>pickeasy  </strong>
              Experience a unique platform where users share images and questions,
              receiving valuable feedback from the community.
            </p>
            {/* <p className='homePage-btnAbout'>  <NavLink id="link" to="/About" style={{ color: "#0D98A0" }}>go about---</NavLink></p> */}
          </div>


          <div className="homePage-half__boxes">
            <div className="homePage-box">
              <span><i className="homePage-homePage-fas fa-paw logo"></i></span>
              <h2>Our Mission</h2>
              <p>To help people make informed decisions through collaborative advice and feedback from the community.</p>
            </div>
            <div className="homePage-box">
              <span><i className="homePage-fas fa-paw logo"></i></span>
              <h2>Our Vision</h2>
              <p> To nurture a platform that encourages consultation, collaboration, and diverse opinions on all topics that matter to you.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePageAboutUs;