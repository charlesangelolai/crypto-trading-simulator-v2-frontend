import { useSelector } from "react-redux";
import Dashboard from "./components/Dashboard";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const App = () => {
  const user = useSelector((state) => state.user.userData);

  if (user) {
    return (
      <div className="App">
        <Dashboard />
      </div>
    );
  } else {
    return (
      <div className="App">
        <SignUp />;
      </div>
    );
  }
};

export default App;
