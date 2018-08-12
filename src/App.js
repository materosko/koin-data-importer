import React, { Fragment, Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Main from './views/Main';
import Step1 from './views/Step1';
import Step2 from './views/Step2';
import Step3 from './views/Step3';
import Step4 from './views/Step4';
import {
  login,
  checkLogin,
  logout,
  getUser,
  getCategories,
  addTransaction,
} from './services/api';
import { converToObject } from './services/utilities';

export default class App extends Component {
  constructor() {
    super();
    this.state = this.getDefaultState();

    this.handleMenuOpenClick = this.handleMenuOpenClick.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleBankChange = this.handleBankChange.bind(this);
    this.handleStepClick = this.handleStepClick.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleCheckLogin = this.handleCheckLogin.bind(this);
    this.selectTransaction = this.selectTransaction.bind(this);
    this.selectTransactions = this.selectTransactions.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.addTransactions = this.addTransactions.bind(this);
  }

  componentWillMount() {
    this.setState({ loading: true });
  }

  async componentDidMount() {
    try {
      await this.handleCheckLogin();
      this.setState({ loading: false });
    }
    catch (err) {
      this.setState({ loading: false });
      throw err;
    }
  }

  getDefaultState() {
    return {
      step: 0,
      open: false,
      loggedIn: false,
      bank: 'otp',
      loading: false,
    };
  }

  handleMenuOpenClick() {
    this.setState({ open: true });
  }

  async handleLogin(data) {
    try {
      const response = await login(data);

      if (response) {
        const [user, categories] = await Promise.all([getUser(), getCategories()]);

        this.setState({
          step: 1,
          loggedIn: true,
          user,
          categories,
        });
      }
    }
    catch (err) {
      // TODO: handle error
      alert('error');
      throw err;
    }
  }

  async handleLogout() {
    try {
      await logout();
      this.setState(this.getDefaultState());
    }
    catch (err) {
      // TODO: handle error
      alert('error');
      throw err;
    }
  }

  async handleCheckLogin() {
    try {
      await checkLogin();
      const [user, categories] = await Promise.all([getUser(), getCategories()]);

      this.setState({
        step: 1,
        loggedIn: true,
        user,
        categories,
      });
    }
    catch (err) {
      // TODO: handle error
      throw err;
    }
  }

  handleBankChange(event, index, value) {
    this.setState({ bank: value });
  }

  handleStepClick(step) {
    return () => {
      this.setState({ step });
    };
  }

  handleFileUpload(acceptedFiles) {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = async () => {
      const data = await converToObject(reader.result, this.state.categories);
      if (data && data.length > 0) {
        this.setState({
          step: 3,
          transactions: data,
        });
      }
    };
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');

    reader.readAsText(file);
  }

  selectTransactions(checked) {
    let transactions = this.state.transactions.slice();
    transactions = transactions.map(item => Object.assign({}, item, { checked }));
    this.setState({ transactions });
  }

  selectTransaction(index, checked) {
    const transactions = this.state.transactions.slice();
    transactions[index].checked = checked;
    this.setState({ transactions });
  }

  changeCategory(index, categoryId) {
    const category = this.state.categories.filter(item => item.id === categoryId)[0];
    const transactions = this.state.transactions.slice();
    transactions[index].category = category;
    this.setState({ transactions });
  }

  addTransactions() {
    this.state.transactions
      .filter(item => item.checked)
      .map(item => addTransaction(this.state.user.default_account_id, item));

    this.setState({
      step: 4,
    });
  }

  render() {
    const { loading, loggedIn, step } = this.state;

    const router = () => {
      switch (step) {
        case 1:
          return (
            <Step1
              bank={this.state.bank}
              handleBankChange={this.handleBankChange}
              handleStepClick={this.handleStepClick}
            />
          );
          break;
        case 2:
          return (
            <Step2
              handleFileUpload={this.handleFileUpload}
              handleStepClick={this.handleStepClick}
            />
          );
          break;
        case 3:
          return (
            <Step3
              transactions={this.state.transactions}
              categories={this.state.categories}
              selectTransactions={this.selectTransactions}
              selectTransaction={this.selectTransaction}
              changeCategory={this.changeCategory}
            />
          );
          break;
          case 4:
          return (
            <Step4
              handleStepClick={this.handleStepClick}
            />
          );
          break;
        default:
        return <Main handleLogin={this.handleLogin} />;
      }
    };

    return (
      <Fragment>
        <Drawer
          open={this.state.open}
          docked={false}
          onRequestChange={open => this.setState({ open })}
        >
          <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
        </Drawer>
        <AppBar
          title="Koin data importer"
          style={{ height: '65px' }}
          showMenuIconButton={loggedIn}
          onLeftIconButtonClick={this.handleMenuOpenClick}
          iconElementRight={step === 3 ? <FlatButton label="Save" /> : null}
          onRightIconButtonClick={this.addTransactions}
        />
        {
          loading ?
            <div>loading...</div> :
            router()
        }
      </Fragment>
    );
  }
}
