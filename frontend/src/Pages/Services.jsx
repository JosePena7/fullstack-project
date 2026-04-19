import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  const allServices = [
    {
      id: 1,
      title: "Grass Cutting",
      category: "Core Service",
      desc: "Our main focus is dependable grass cutting that keeps your property neat, clean, and under control week after week.",
      features: ["Routine Lawn Mowing", "Professional Edging", "String Trimming", "Cleanup of Walkways and Driveways"],
      image: "https://images.unsplash.com/photo-1533460004989-cee1901c0482?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Yard Cleanup & Tree Work",
      category: "Additional Services",
      desc: "Need more than a regular mow? We also handle hedge trimming, overgrown yards, and general tree work for properties that need extra attention.",
      features: ["Hedge Trimming", "Cutting Overgrown Yards", "Brush and Debris Cleanup", "Tree Trimming and Light Tree Work"],
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="services-page min-vh-100">
      <section className="page-hero py-5 shadow">
        <div className="container text-center py-5 position-relative">
          <span className="eyebrow mb-3">Reliable Yard Work</span>
          <h1 className="section-title fw-bold mb-3">Grass cutting first, with extra help when your yard needs more.</h1>
          <p className="lead text-white-50 mb-0">
            We specialize in routine mowing and also offer hedge trimming, overgrown yard cuts, and tree work.
          </p>
        </div>
      </section>

      <section className="container section-shell">
        {allServices.map((service, index) => (
          <div
            key={service.id}
            className={`row align-items-center mb-5 pb-lg-4 ${index % 2 !== 0 ? 'flex-lg-row-reverse' : ''}`}
          >
            <div className="col-lg-6">
              <img src={service.image} alt={service.title} className="img-fluid rounded-5 shadow-lg mb-4 mb-lg-0" />
            </div>

            <div className="col-lg-6 ps-lg-5 pe-lg-5">
              <div className="services-feature-panel p-4 p-lg-5">
                <span className="eyebrow mb-3">{service.category}</span>
                <h2 className="fw-bold display-6 mb-3">{service.title}</h2>
                <p className="text-soft mb-4">{service.desc}</p>

                <ul className="list-unstyled mb-4 service-feature-list">
                {service.features.map((feat, i) => (
                  <li key={i} className="mb-2 d-flex align-items-center">
                    <i className="bi bi-check2-circle text-success me-2 fs-5"></i>
                    {feat}
                  </li>
                ))}
                </ul>

                <Link to="/quote" className="btn btn-brand px-4">
                  Request an Estimate
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="py-5 border-top">
        <div className="container">
          <div className="services-table-shell p-4 p-lg-5">
            <h2 className="text-center fw-bold mb-5">Compare service options</h2>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 services-comparison-table">
              <thead className="table-light">
                <tr>
                  <th>Feature</th>
                  <th className="text-center">Routine Lawn Care</th>
                  <th className="text-center text-success">Yard Recovery & Detail Work</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Grass Cutting</td>
                  <td className="text-center">✔️</td>
                  <td className="text-center">✔️</td>
                </tr>
                <tr>
                  <td>Hedge Trimming</td>
                  <td className="text-center">Optional</td>
                  <td className="text-center text-success fw-bold">✔️</td>
                </tr>
                <tr>
                  <td>Overgrown Yard Cutting</td>
                  <td className="text-center">By Request</td>
                  <td className="text-center text-success fw-bold">✔️</td>
                </tr>
                <tr>
                  <td>Tree Work</td>
                  <td className="text-center">By Request</td>
                  <td className="text-center text-success fw-bold">✔️</td>
                </tr>
              </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
