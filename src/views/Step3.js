import React from 'react';
import PropTypes from 'prop-types';
import Transactions from '../components/Transactions';

const Step3 = ({
  transactions,
  selectTransactions,
  selectTransaction,
  changeCategory,
  categories,
}) => (
  <Transactions
    transactions={transactions}
    categories={categories}
    selectTransactions={selectTransactions}
    selectTransaction={selectTransaction}
    changeCategory={changeCategory}
  />
);

Step3.propTypes = {
  transactions: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  selectTransactions: PropTypes.func.isRequired,
  selectTransaction: PropTypes.func.isRequired,
  changeCategory: PropTypes.func.isRequired,
};

export default Step3;
