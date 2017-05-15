import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavButtons.sass';

export default class NavButtons extends Component {

  constructor(props) {
    super(props);
    this.state = {
      previousPage: '',
      currentPage: ''
    }
  }

  render() {
    return (
      <div className="btn-group">
        <Link
          to={this.props.prevLink}
          className="btn btn-prev ">
          Previous
        </Link>
        <Link
          to={this.props.nextLink}
          className={`btn btn-next ${this.props.disabled ? 'disabled' : ''}`}>
          Next
        </Link>
      </div>

    )
  }
}
