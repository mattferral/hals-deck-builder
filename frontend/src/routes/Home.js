import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <div
      className='position-absolute top-50 start-50 translate-middle'
    >
      <h1
        className='bg-white border border-primary rounded'
      >
        Hal's deck builder
      </h1>

      <Link
        className='btn btn-primary'
        to="/decks"
      >
          Get Started
      </Link>
    </div>
  );
};

export default Home;