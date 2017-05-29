import React from 'react';
import { Link } from 'react-router-dom';

const PrevNextButtons = ({ previousPage, nextPage, canMoveForward }) => {
    return (
      <div className="btn-group">
        <Link
          to={{
            pathname: previousPage,
            state: { direction: 'previous' }
          }}
          className="btn btn-prev">
          Previous
        </Link>
        <Link
          to={{
            pathname: nextPage,
            state: { direction: 'next' }
          }}
          className={`btn btn-next ${canMoveForward ? '' : 'disabled'}`}>
          Next
        </Link>
      </div>
    );
};

export default PrevNextButtons;
