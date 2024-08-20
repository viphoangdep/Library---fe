import React from 'react';
import NavBar from '../component/NavBar';
import BigContent from '../component/BigContent';
// import Hero from '../component/Hero';

import MiniContent from '../component/MiniContent';
import Footer from '../component/Footer';
function Introduction() {
  return (
    <div className="Introduction">
      
      <BigContent bigcontent ="Fahasa - Camp of the soul" position ="text-center"></BigContent>
      {/* <Hero></Hero> */}
      <MiniContent></MiniContent>
      
      
    </div>
  );
}

export default Introduction;