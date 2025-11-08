import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/common/Header';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Games from './components/sections/Games';
import MyWorlds from './components/sections/MyWorlds';
import Contact from './components/sections/Contact';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app font-space-grotesk">
        <Header />
        <main>
          <div id="hero">
            <Hero />
          </div>
          <About />
          <Projects />
          <Games />
          <MyWorlds />
          <Contact />
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;