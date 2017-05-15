import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Success extends Component {
  render() {
    return (
        <div>
          <h1>success</h1>
          <Link to="/">Home</Link>
        </div>
    );
  }
}

export { Success };
