import React from 'react';

const ServiceCard = (props) => {
  return (
    <div className="col-md-6 col-xl-4">
      <div className="service-card">
        <div className="card-body p-4 p-lg-5 text-center text-lg-start">
          <div className="service-card-icon d-inline-flex align-items-center justify-content-center">
            <i className={`bi ${props.icon} fs-3`}></i>
          </div>

          <h5 className="fw-bold mb-3">{props.title}</h5>
          <p className="text-soft mb-0">{props.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
