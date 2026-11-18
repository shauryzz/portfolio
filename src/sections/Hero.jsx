import { profile } from '../constants/portfolio';
import CinematicScene from '../components/CinematicScene';

const heroLoopItems = [
  'SHOPIFY',
  'CONVERSIONS',
  'FULL-STACK',
  'E-COMMERCE',
];

export default function Hero({ paused, setPaused }) {
  return (
    <section id="home" className={`sa-hero ${paused ? 'is-paused' : ''}`} aria-labelledby="hero-name">
      <CinematicScene paused={paused} />
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
