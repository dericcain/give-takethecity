import React from 'react';
import { shallow } from 'enzyme';
import { Amount } from './Amount';
import DonationStore from '../../stores/DonationStore';

describe('<Amount />', () => {

  it('renders without crashing', () => {
    const donation = new DonationStore();
    const wrapper = shallow(<Amount donation={donation} />);
  });
});

