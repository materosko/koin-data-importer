import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

const Step4 = ({ handleStepClick }) => (
  <div>
    <h2>The transactions are succesfully added.</h2>
    <RaisedButton primary fullWidth style={{ marginTop: 30 }} onClick={handleStepClick(1)}>
      <span style={{ color: '#fff' }}>Add more transactions</span>
    </RaisedButton>
  </div>
);

Step4.propTypes = {
  handleStepClick: PropTypes.func.isRequired,
};

export default Step4;
