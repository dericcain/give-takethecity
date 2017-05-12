import React, { Component } from 'react';
import DonationButtons from './components/DonationButtons';
import Logo from './components/Logo';

class Amount extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.key);
  }

  render() {
    return (
      <div key={this.props.key}>
        <Logo />
        <h2 className="text-center">Thanks for giving!</h2>
        <p>We are honored the you want to partner with us to transform cities! Your gift will have a
          direct impact
          on the lives of those who need to hear the hope of Christ. If you want to learn more about
          what we do, <a href="https://takethecity.com">click here</a>.</p>
        <div id="amount">
          <label className="label">How much would you like to give?</label>
          <div className="columns is-multiline is-gapless is-mobile">
            <div className="column is-half">
              <button type="button" className="button give-button">$25</button>
            </div>
            <div className="column is-half">
              <button type="button" className="button give-button">$50</button>
            </div>
            <div className="column is-half">
              <button type="button" className="button give-button">$100</button>
            </div>
            <div className="column is-half">
              <button type="button" className="button give-button">$250</button>
            </div>
            <div className="column is-12">
              <p className="control amount has-icon">
                <input className="input"
                       id="other-amount"
                       type="number"
                       placeholder="Other amount?" />
                <span className="icon is-small">
                                <i className="fa fa-usd" />
                            </span>
              </p>
            </div>
            <div id="cover-fees" className="column is-12">
              <p>I'd like to cover the ( donation.fees / 100 ) processing fee so 100% of my donation
                goes to Take the City.</p>
              <button type="button" className="button">
                <i className="fa fa-check" />
                <span>Click to cover fees!</span>
                <span>Fees covered!</span>
              </button>
            </div>
          </div>
        </div>
        <DonationButtons
          prevLink="/"
          nextLink="/personal-info"
        />
      </div>
    );
  }
}

export { Amount };