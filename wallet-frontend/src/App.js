import React from 'react';
import './App.css';
import { Link ,BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import NewWallet from './component/new-wallet';
import Spendfund from './component/spend-funds';
import Balance from './component/check-balance';
import AllWallet from './component/all-wallet';
import AllTransaction from './component/all-transaction';
import AddFund from './component/add-funds';

function App() {
  return (
    <div className="App">
    <Router>
      <div className="App-header">
      <h1> My Wallet </h1>
      </div>
      <div className="main">
      <div className="nav">
    <ul>
  <li><Link to="/new-wallet">New Wallet</Link></li>
  <li><Link to="/all-wallet">All Wallets</Link></li>
  <li><Link to="/check-balance">Check Balance</Link></li>
  <li><Link to="/add-fund">Add Funds</Link></li>
  <li><Link to="/spend-fund">Spend Funds</Link></li>
  <li><Link to="/all-transactions">All Transactions</Link></li>
</ul>
</div>
<div className="body">
<Switch>
    <Route exact path="/all-wallet">
      <AllWallet />
    </Route>
    <Route path="/new-wallet">
      <NewWallet />
    </Route>
    <Route path="/check-balance">
      <Balance />
    </Route>
    <Route exact path="/add-fund">
      <AddFund />
    </Route>
    <Route path="/spend-fund">
      <Spendfund />
    </Route>
    <Route path="/all-transactions">
      <AllTransaction />
    </Route>
  </Switch>
</div>
</div>
</Router>
    </div>
  );
}

export default App;
