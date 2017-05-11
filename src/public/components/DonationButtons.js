import React from 'react';
import { Link } from 'react-router-dom';
import './DonationButtons.sass';

const DonationButtons = ({ nextLink, prevLink }) => (
  <div className="btn-group">
    <Link to={prevLink} className="btn btn__prev">Previous</Link>
    <Link to={nextLink} className="btn btn__next">Next</Link>
  </div>
);

export default DonationButtons;