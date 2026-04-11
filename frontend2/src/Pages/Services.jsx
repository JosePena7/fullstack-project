import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  const allServices = [
    {
      id: 1,
      title: "Precision Mowing",
      category: "Maintenance",
      desc: "More than just a cut. We analyze your grass type to determine the perfect height for health and color.",
      features: ["Professional Edging", "String Trimming", "Blowing of Walkways", "Grass Clipping Removal"],
      image: "https://images.unsplash.com/photo-1533460004989-cee1901c0482?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Nutrient Management",
      category: "Health",
      desc: "Our 5-step fertilization program ensures your soil has the exact nutrients needed for each season.",
      features: ["Soil Testing", "Weed Prevention", "Organic Fertilizers", "Pest Control"],
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="services-page min-vh-100">
      <section className="page-hero py-5 shadow">
        <div className="container text-center py-5 position-relative">
          <span className="eyebrow mb-3">Full Service Care</span>
          <h1 className="section-title fw-bold mb-3">Outdoor care with a premium finish.</h1>
          <p className="lead text-white-50 mb-0">
            Professional upkeep plans built for curb appeal, plant health, and less homeowner stress.
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
            <h2 className="text-center fw-bold mb-5">Compare maintenance plans</h2>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 services-comparison-table">
              <thead className="table-light">
                <tr>
                  <th>Feature</th>
                  <th className="text-center">Basic</th>
                  <th className="text-center text-success">Premium</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Mowing & Edging</td>
                  <td className="text-center">✔️</td>
                  <td className="text-center">✔️</td>
                </tr>
                <tr>
                  <td>Fertilization</td>
                  <td className="text-center">❌</td>
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
