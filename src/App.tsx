import { useSelector } from "react-redux";
import Layout from "./components/Layout";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import TransactionsTable from "./components/TransactionsTable";
import Account from "./components/Account";
import NotFound from "./components/NotFound";
import { RootState } from "./reducers/combineReducer";

const App = () => {
  const user = useSelector((state: RootState) => state.user.userData);

  if (user) {
    return (
      <div className="App">
        <Router>
          <Layout user={user}>
            <Switch>
              <Route exact path="/signup">
                <Redirect to="/dashboard" />
              </Route>
              <Route exact path="/dashboard" component={Dashboard} />
              {/* <Route path="/news"></Route> */}
              <Route exact path="/transactions" component={TransactionsTable} />
              <Route exact path="/account" component={Account} />
              <Route component={NotFound} />
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
            <Route exact path="/">
              <Redirect to="/signin" />
            </Route>
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
};

export default App;
