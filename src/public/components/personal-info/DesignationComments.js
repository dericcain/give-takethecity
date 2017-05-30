import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import './DesignationComments.sass'

@inject('donation') @observer
class DesignationComments extends Component {

  showTextarea() {
    const { designation, personalInfo } = this.props.donation;

    switch (designation) {
      case '4':
        return (
          <textarea
            id="staffSupport"
            className="textarea"
            value={personalInfo.staffSupport}
            onChange={this.props.onChange}
            placeholder="What staff member would you like to support?"
          />
        );
      case '5':
        return (
          <textarea
            id="missionSupport"
            rows="2"
            className="textarea"
            value={personalInfo.missionSupport}
            onChange={this.props.onChange}
            placeholder="Who would you like to support? Also, what trip are they going on?"
          />
        );
      default:
        return (
          <textarea
            id="generalComments"
            rows="2"
            className="textarea"
            onChange={this.props.onChange}
            value={personalInfo.generalComments}
            placeholder="Do you have any additional comments?"
          />
        );
    }
  }

  render() {
    return (
      <div className="textarea-wrapper">
        {this.showTextarea()}
      </div>
    );
  }
}

export default DesignationComments;
