import React from 'react';

const ReviewCard = (props) => {
  return (
    <div className="col-md-6 col-xl-4">
      <div className="testimonial-card text-center">
        <div className="mb-4">
          <img
            src={props.image}
            alt={`Profile of ${props.name}`}
            className="review-avatar rounded-circle shadow-sm mx-auto"
          />
        </div>

        <div className="testimonial-stars mb-3">
          {Array.from({ length: props.stars }).map((_, index) => (
            <i key={index} className="bi bi-star-fill mx-1"></i>
          ))}
        </div>

        <p className="text-soft fst-italic mb-3">
          “{props.text}”
        </p>

        <h6 className="fw-bold mb-1 text-dark">{props.name}</h6>
        <small className="text-soft">Verified local client</small>
      </div>
    </div>
  );
};

export default ReviewCard;
