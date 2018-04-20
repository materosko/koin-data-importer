import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const Main = ({ bank, handleBankChange }) => (
  <div>
    <SelectField
      floatingLabelText="Bank"
      value={bank}
      onChange={handleBankChange}
    >
      <MenuItem value="otp" primaryText="Otp Bank" />
    </SelectField>
  </div>
);

Main.propTypes = {
  bank: PropTypes.string.isRequired,
  handleBankChange: PropTypes.func.isRequired,
};

export default Main;
