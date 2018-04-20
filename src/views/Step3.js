import React from 'react';
import PropTypes from 'prop-types';
import Transactions from '../components/Transactions';

const Step3 = ({ transactions, selectTransactions, selectTransaction }) => (
  <Transactions
    transactions={transactions}
    selectTransactions={selectTransactions}
    selectTransaction={selectTransaction}
  />
);

Step3.propTypes = {
  transactions: PropTypes.array.isRequired,
  selectTransactions: PropTypes.func.isRequired,
  selectTransaction: PropTypes.func.isRequired,
};

export default Step3;
