import React from 'react';
import JumboTron from '../Components/JumboTron';
import Cards from '../Components/Cards';
import CTA from '../Components/CTA';
import Testimonials from '../Components/Testimonials';
import EstimateForm from '../Components/EstimateForm';

const Home = () => {
  return (
    <div>
      <section className="page-section">
        <JumboTron />
      </section>
      <Cards />
      <Testimonials />
      <CTA />
      <EstimateForm />

    </div>

  );
};

export default Home;
