import React from 'react';
import { Link } from 'react-router-dom';

const JumboTron = () => {
  return (
    <div className="container col-xxl-11 hero-section">
      <div className="hero-panel">
        <div className="row flex-lg-row-reverse align-items-center g-5">
          <div className="col-lg-6">
            <div className="hero-visual">
              <div className="hero-image-frame">
                <img
                  src="https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&w=1200&q=80"
                  className="hero-image"
                  alt="Perfectly maintained lawn outside a modern home"
                  loading="lazy"
                />
              </div>
              <div className="hero-floating-card">
                <span className="eyebrow mb-3">Fast Turnaround</span>
                <strong>Quotes in 24 hours</strong>
                <p className="mb-0 mt-2 small text-white-50">
                  Clear scheduling, dependable crews, and a lawn that stays photo-ready.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="hero-copy">
              <span className="eyebrow mb-3">Serving Michoacan Homes</span>
              <h1 className="display-title fw-bold mb-3">
                Lawn care that feels sharp, calm, and completely handled.
              </h1>
              <p className="hero-summary text-soft mb-0">
                We blend polished curb appeal with reliable service plans, so your yard looks
                intentional every week without you having to chase vendors or schedules.
              </p>

              <div className="hero-actions">
                <Link to="/quote" className="btn btn-brand btn-lg">
                  Get My Free Quote
                </Link>
                <Link to="/services" className="btn btn-outline-brand btn-lg">
                  Explore Services
                </Link>
              </div>

              <div className="hero-metrics">
                <div className="metric-card">
                  <span className="metric-value">24h</span>
                  <span className="text-soft small">Typical quote response</span>
                </div>
                <div className="metric-card">
                  <span className="metric-value">5-Star</span>
                  <span className="text-soft small">Neighbor-first service standard</span>
                </div>
                <div className="metric-card">
                  <span className="metric-value">Local</span>
                  <span className="text-soft small">Crews that know the climate and soil</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JumboTron;
