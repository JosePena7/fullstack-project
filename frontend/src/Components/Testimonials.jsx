import React from 'react';
import ReviewCard from './ReviewCard';

const Testimonials = () => {
  // Array of data - each object has an 'image' now!
  const neighborReviews = [
    {
      id: 1,
      name: "Juan Hernandez",
      text: "They are consistent, polite, and my lawn has never looked greener. Highly recommended!",
      stars: 5,
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=300&q=80" // Modern placeholder
    },
    {
      id: 2,
      name: "Maria Lopez",
      text: "We hired them in Huntsville and they turned our overgrown yard into something we are proud to come home to.",
      stars: 5,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 3,
      name: "Carlos Ruiz",
      text: "Efficient, insured, and locally trusted. They make booking and paying incredibly easy.",
      stars: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
    }
  ];

  return (
    <section className="testimonial-section page-section">
      <div className="container section-shell">
        <div className="section-heading">
          <span className="eyebrow mb-3">Local And Trusted</span>
          <h2 className="section-title fw-bold mb-3">Neighbors notice the difference quickly.</h2>
          <p className="text-soft mb-0">
            Homeowners stay with us because the results are visible and the process is easy.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {neighborReviews.map((review) => (
            <ReviewCard
              key={review.id}
              name={review.name}
              text={review.text}
              stars={review.stars}
              image={review.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
