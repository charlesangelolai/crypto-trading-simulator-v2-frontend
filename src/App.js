import { useSelector } from "react-redux";
import Layout from "./components/Layout";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import TransactionsTable from "./components/TransactionsTable";
import Account from "./components/Account";

const App = () => {
  const user = useSelector((state) => state.user.userData);

  if (user) {
    return (
      <div className="App">
        <Router>
          <Layout user={user}>
            <Switch>
              <Route exact path="/dashboard" component={Dashboard} />
              {/* <Route path="/news"></Route> */}
              <Route exact path="/transactions" component={TransactionsTable} />
              <Route path="/account" exact component={Account} />
            </Switch>
          </Layout>
        </Router>
      </div>
    );
  } else {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
          </Switch>
        </div>
      </Router>
    );
  }
};

export default App;
