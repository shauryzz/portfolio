import { profile } from '../constants/portfolio';
import { Component, lazy, Suspense } from 'react';
const CinematicScene = lazy(() => import('../components/CinematicScene'));
function HeroBackdrop() {
  return <div className="sa-cinema" aria-hidden="true"><div className="sa-portal"><i/><b/></div><div className="sa-cinema-fallback"/><div className="sa-cinema-vignette"/></div>;
}
class HeroSceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <HeroBackdrop/> : this.props.children; }
}

const heroLoopItems = [
  'SHOPIFY',
  'CONVERSIONS',
  'FULL-STACK',
  'E-COMMERCE',
];

export default function Hero({ paused, setPaused }) {
  return (
    <section id="home" className={`sa-hero ${paused ? 'is-paused' : ''}`} aria-labelledby="hero-name">
      <HeroSceneBoundary><Suspense fallback={<HeroBackdrop/>}><CinematicScene paused={paused}/></Suspense></HeroSceneBoundary>
      <h1 className="sa-sr-only" id="hero-name">
        {profile.name} — {profile.role}
      </h1>

      <div className="sa-name-window" aria-hidden="true">
        <div className="sa-name-track">
          {Array.from({ length: 2 }, (_, i) => (
            <div className="sa-name-loop" key={i}>
              {heroLoopItems.map((item) => (
                <span className="sa-name-pair" key={`${i}-${item}`}><span>{item}</span><span className="sa-name-dot" /></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="sa-hero-static" aria-hidden="true">Shopify.<br/>Full-stack.<br/><em>Conversions.</em></div>
      <div className="sa-hero-bottom">
        <div className="sa-hero-actions">
          <button
            className="sa-motion-toggle"
            type="button"
            aria-pressed={paused}
            onClick={() => setPaused((v) => !v)}
          >
            {paused ? 'Play motion' : 'Pause motion'}
          </button>
        </div>
        <p>
          Shopify &amp; full-stack
          <br />
          {profile.headline}
        </p>
      </div>
    </section>
  );
}
