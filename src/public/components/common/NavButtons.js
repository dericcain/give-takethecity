import React from 'react';
import { Link } from 'react-router-dom';
import './NavButtons.sass';

const NavButtons = ({ nextLink, prevLink }) => (
  <div className="btn-group">
    <Link to={prevLink} className="btn btn-prev">
      Previous
    </Link>
    <Link to={nextLink} className="btn btn-next">
      Next
    </Link>
  </div>
);

export default NavButtons;