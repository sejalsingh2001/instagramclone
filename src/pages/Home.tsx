import { useEffect } from 'react';
import React from 'react';

import Navbar from '../components/Navbari/Navbar';
import Maincontent from '../components/Maincontenti/Maincontent';

function Home() {
  useEffect(() => {
    document.title = 'Instagram';
  }, []);

  return (
    <div className="main_dashboard">
      <Navbar />
      <Maincontent />
    </div>
  );
}

export default Home;
