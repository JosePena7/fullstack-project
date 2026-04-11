import React from 'react';
import ServiceCard from './ServiceCard';

const Cards = () => {
  const services = [
    {
      id: 1,
      title: "Premium Mowing",
      desc: "Detailed cutting, edging, and blowing for a perfect finish.",
      icon: "bi-scissors"
    },
    {
      id: 2,
      title: "Organic Nutrition",
      desc: "Eco-friendly fertilization to keep your lawn healthy and green.",
      icon: "bi-leaf"
    },
    {
      id: 3,
      title: "System Repair",
      desc: "Full irrigation diagnostics and sprinkler head maintenance.",
      icon: "bi-droplet-fill"
    }
  ];

  return (
    <section className="page-section cards-section">
      <div className="container section-shell">
        <div className="section-heading">
          <span className="eyebrow mb-3">Built For Consistency</span>
          <h2 className="section-title fw-bold mb-3">
            A cleaner yard, a calmer schedule, and fewer things to manage yourself.
          </h2>
          <p className="text-soft mb-0">
            Every service is designed to keep the property looking intentional from the curb
            while making the homeowner experience simple behind the scenes.
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
