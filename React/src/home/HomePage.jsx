import React, { useEffect, useState } from 'react';
import './StyleHomePage.css'
import HomePageScrollImg from './HomePageScrollImg';
import HomePageAboutUs from './HomePageAboutUs';
import HomePageWhatWeDo from './HomePageWhatWeDo';
import HomePageAdvantages from './HomePageAdvantages';
import HomePageStatement from './HomePageStatement';

const HomePage = () => {

  const [showAbout, setShowAbout] = useState(false);
  const handleClickButtonAbout = () => {
    setShowAbout(true);
  }
  return (
    <div>

      <HomePageScrollImg></HomePageScrollImg>
      <HomePageAboutUs ></HomePageAboutUs>
      <HomePageWhatWeDo></HomePageWhatWeDo>

      <HomePageStatement></HomePageStatement>
      <HomePageAdvantages></HomePageAdvantages>








    </div>
  );
};

export default HomePage;


