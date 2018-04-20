import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';

class Transactions extends Component {
  constructor() {
    super();

    this.handleAllTransactionSelection = this.handleAllTransactionSelection.bind(this);
    this.handleTransactionSelection = this.handleTransactionSelection.bind(this);
  }

  handleAllTransactionSelection(event, checked) {
    this.props.selectTransactions(checked);
  }

  handleTransactionSelection(index) {
    return (event, checked) => this.props.selectTransaction(index, checked);
  }

  render() {
    return (
      <Table height="calc(100% - 59px)">
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>
              <Checkbox onCheck={this.handleAllTransactionSelection} />
            </TableHeaderColumn>
            <TableHeaderColumn>Date</TableHeaderColumn>
            <TableHeaderColumn>Value</TableHeaderColumn>
            <TableHeaderColumn>Currency</TableHeaderColumn>
            <TableHeaderColumn>Category</TableHeaderColumn>
            <TableHeaderColumn>Company</TableHeaderColumn>
            <TableHeaderColumn>Type</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {
            this.props.transactions.map((item, index) => (
              <TableRow key={`item-${index}`}>
                <TableRowColumn>
                  <Checkbox
                    checked={item.checked}
                    onCheck={this.handleTransactionSelection(index)}
                  />
                </TableRowColumn>
                <TableRowColumn>{item.date}</TableRowColumn>
                <TableRowColumn>{item.value}</TableRowColumn>
                <TableRowColumn>{item.currency}</TableRowColumn>
                <TableRowColumn>{item.category ? item.category.name : ''}</TableRowColumn>
                <TableRowColumn title={item.place}>{item.place}</TableRowColumn>
                <TableRowColumn>{item.type}</TableRowColumn>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    );
  }
}

Transactions.propTypes = {
  transactions: PropTypes.array.isRequired,
  selectTransactions: PropTypes.func.isRequired,
  selectTransaction: PropTypes.func.isRequired,
};

export default Transactions;
