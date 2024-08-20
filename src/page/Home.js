import React from 'react';


import BigContent from '../component/BigContent';
import Hero from '../component/Hero';

import MiniContent from '../component/MiniContent';
import Footer from '../component/Footer';
function Home() {
  return (
    <div className="Home">
      
      
      <BigContent bigcontent ="Fahasa - Camp of the soul" position ="text-center"></BigContent>
      <Hero></Hero>
      <MiniContent></MiniContent>
      
      
    </div>
  );
}

export default Home;