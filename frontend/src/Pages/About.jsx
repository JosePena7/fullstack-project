import React from 'react';

const About = () => {
  return (
    <div className="bg-white">
      {/* 1. Header Section */}
      <section className="py-5 bg-success text-white text-center">
        <div className="container">
          <h1 className="display-4 fw-bold">Rooted in Excellence</h1>
          <p className="lead">Serving homeowners across Huntsville, Alabama with pride and dependable care.</p>
        </div>
      </section>

      {/* 2. Our Story Section */}
      <section className="py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <img 
                src="https://images.unsplash.com/photo-1591161239853-2713f0190547?auto=format&fit=crop&w=800&q=80" 
                className="img-fluid rounded-5 shadow" 
                alt="Our team at work" 
              />
            </div>
            <div className="col-lg-6 ps-lg-5">
              <h2 className="fw-bold mb-4">Why We Started</h2>
              <p className="text-secondary">
                We realized that homeowners spend their most valuable time, their weekends, working in the yard instead of relaxing with their families.
              </p>
              <p className="text-secondary">
                Our mission is simple: to provide precision lawn care across Huntsville that blends traditional hard work with modern technology. By using a data-driven approach to fertilization and a client-first portal, we make lawn maintenance completely stress-free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values (3-Column Grid) */}
      <section className="py-5 bg-light">
        <div className="container py-5">
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="p-4 bg-white rounded-4 shadow-sm h-100">
                <i className="bi bi-shield-check text-success fs-1 mb-3"></i>
                <h4 className="fw-bold">Fully Insured</h4>
                <p className="text-muted small">Your property is protected. We are 100% bonded and insured for your peace of mind.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 bg-white rounded-4 shadow-sm h-100">
                <i className="bi bi-clock-history text-success fs-1 mb-3"></i>
                <h4 className="fw-bold">Reliable Timing</h4>
                <p className="text-muted small">We show up when we say we will. No more guessing when the mower will arrive.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 bg-white rounded-4 shadow-sm h-100">
                <i className="bi bi-phone text-success fs-1 mb-3"></i>
                <h4 className="fw-bold">Tech-Forward</h4>
                <p className="text-muted small">Manage your billing, schedules, and quotes through our modern client portal.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container py-5">
          <div className="row g-4 align-items-center">
            <div className="col-lg-5">
              <span className="eyebrow mb-3 d-inline-block">Service Area</span>
              <h2 className="fw-bold mb-3">Proudly serving Huntsville, Alabama</h2>
              <p className="text-secondary mb-0">
                We help homeowners throughout Huntsville with recurring mowing, seasonal cleanup,
                and curb-appeal upgrades designed for North Alabama properties.
              </p>
            </div>
            <div className="col-lg-7">
              <div className="ratio ratio-16x9 rounded-4 overflow-hidden shadow">
                <iframe
                  title="Map of Huntsville, Alabama"
                  src="https://www.google.com/maps?q=Huntsville%2C%20Alabama&z=11&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
