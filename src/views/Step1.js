import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import BankSelector from '../components/BankSelector';

const styles = {
  container: {
    position: 'relative',
    marginTop: 50,
    width: 300,
    margin: 20,
    padding: 20,
    display: 'block',
    alignSelf: 'center',
  },
};

const Step1 = ({ bank, handleBankChange, handleStepClick }) => (
  <div style={styles.container}>
    <BankSelector bank={bank} handleBankChange={handleBankChange} />
    <RaisedButton primary fullWidth style={{ marginTop: 30 }} onClick={handleStepClick(2)}>
      <span style={{ color: '#fff' }}>Next</span>
    </RaisedButton>
  </div>
);

Step1.propTypes = {
  bank: PropTypes.string.isRequired,
  handleBankChange: PropTypes.func.isRequired,
  handleStepClick: PropTypes.func.isRequired,
};

export default Step1;
