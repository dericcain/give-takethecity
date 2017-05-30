import React, { Component } from 'react';
import './SelectWrapper.sass';

export default class SelectWrapper extends Component {

  buildList() {
    let optionsList = [];
    const { placeHolder, data } = this.props;
    optionsList.push(
      <option key="99" value="" disabled>{placeHolder}</option>
    );
    data.forEach((value) => {
      const month = SelectWrapper.padNumber(value);
      optionsList.push(
        <option key={month} value={month}>{month}</option>
      );
    });

    return optionsList;
  }

  static padNumber(number) {
    if (number.toString().length < 2) {
      return `0${number}`;
    }

    return number;
  }

  render() {
    const {
      name,
      onChange,
      errorMessage,
      size,
      value
    } = this.props;

    return (
      <div className={`select-wrapper ${size}`}>
        <select
          id={name}
          value={value}
          defaultValue=""
          onChange={onChange}>
          {this.buildList()}
        </select>
        <span className={`hidden error error-${name}`}>
          {errorMessage}
        </span>
      </div>
    );
  }
}
