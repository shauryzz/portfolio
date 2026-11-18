import { useState } from 'react';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Works from './sections/Works';
import { About, Expertise, Closing } from './sections/ProfileSections';

export default function App() {
  const [paused, setPaused] = useState(false);
  return (
    <div className={`sa-site${paused ? ' is-motion-paused' : ''}`}>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero paused={paused} setPaused={setPaused} />
        <About />
        <Works />
        <Expertise />
        <Closing />
      </main>
    </div>
  );
}
