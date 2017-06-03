import React from 'react';

const DonorFields = ({ donor }) => {
  const {
    email,
    full_name,
    address,
    phone,
    zip
  } = donor;

  return (
    <div className="donor-section">
      <div className="donor-section-heading">
        <h1>{full_name}</h1>
        <p>{email}</p>
      </div>
      <div className="donor-section-details">
        <dl>
          <dt>Address</dt>
          <dd>{address}</dd>
          <dd>{zip}</dd>
          <dt>Phone</dt>
          <dd>{phone}</dd>
        </dl>
      </div>
    </div>
  );
};

export default DonorFields;
