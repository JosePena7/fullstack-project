import React from 'react';
import EstimateForm from '../Components/EstimateForm';

const QuotePage = () => {
  return (
    <div className="quote-page-shell">
      <section className="quote-hero py-5 shadow-sm">
        <div className="container text-center py-5 position-relative">
          <span className="eyebrow mb-3">Custom Quote</span>
          <h1 className="section-title fw-bold mb-3">Request a free quote</h1>
          <p className="lead text-white-50 mb-0">
            Share a few details about your property and we’ll send back a tailored plan.
          </p>
        </div>
      </section>

      <div className="quote-form-overlap">
        <EstimateForm />
      </div>

      <div className="container pb-5 text-center">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h5 className="fw-bold text-dark">What happens next?</h5>
            <p className="text-soft">
              Once you submit this form, our team will review your property using satellite imagery
              and send a detailed quote to your email within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotePage;
