import React from 'react';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row g-4 align-items-center">
          <div className="col-md-7 text-center text-md-start">
            <p className="mb-1 fw-bold">GRNTKM Lawn Care</p>
            <small className="footer-note">
              Precision mowing, fertilizer planning, and reliable upkeep for modern homes.
            </small>
          </div>
          <div className="col-md-5 text-center text-md-end">
            <p className="mb-1">© {new Date().getFullYear()} GreenThumb Lawn Care LLC</p>
            <small className="footer-note">Licensed • Insured • Professional</small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
