import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="page-section">
      <div className="container section-shell pt-0">
        <div className="cta-panel text-center text-lg-start">
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <span className="eyebrow mb-3">Simple Next Step</span>
              <h2 className="section-title fw-bold mb-3">Ready for a sharper-looking lawn?</h2>
              <p className="lead mb-0 text-white-50">
                Tell us about your property and we’ll map out the fastest path to a cleaner,
                greener yard.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <Link className="btn btn-light btn-lg px-5 fw-bold text-success rounded-pill" to="/quote">
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
