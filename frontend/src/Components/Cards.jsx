import React from 'react';
import ServiceCard from './ServiceCard';

const Cards = () => {
  const services = [
    {
      id: 1,
      title: "Grass Cutting",
      desc: "Routine mowing, edging, and cleanup to keep the lawn looking sharp.",
      icon: "bi-scissors"
    },
    {
      id: 2,
      title: "Hedge Trimming",
      desc: "Clean up hedges and shrubs for a more polished, manageable yard.",
      icon: "bi-tree"
    },
    {
      id: 3,
      title: "Overgrown Yards & Tree Work",
      desc: "One-time heavy cuts, brush cleanup, and tree work for tougher jobs.",
      icon: "bi-tools"
    }
  ];

  return (
    <section className="page-section cards-section">
      <div className="container section-shell">
        <div className="section-heading">
          <span className="eyebrow mb-3">Yard Services</span>
          <h2 className="section-title fw-bold mb-3">
            Grass cutting is the main service, with extra help for the bigger cleanup jobs.
          </h2>
          <p className="text-soft mb-0">
            Book recurring mowing or request help with hedge trimming, overgrown yards,
            and tree work when the property needs more than a standard cut.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {services.map((item) => (
            <ServiceCard
              key={item.id}
              title={item.title}
              description={item.desc}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cards;
