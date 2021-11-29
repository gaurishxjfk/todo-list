import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import { UserState } from "./context";
import Homepage from "./Pages/Homepage";
import ProtectedRoute from "./components/ProtectedRoute";
import Notfound from "./components/Notfound";
import AdminPage from "./components/AdminPage";
import ProtectedAdmin from "./components/ProtectedAdmin";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

// eslint-disable-next-line func-names
const App = function () {
  const { isLoggedIn, isAdmin } = UserState();

  const redirectTo = () => {
    if (isAdmin) {
      return <Redirect to="/admin" />;
    }
    if (isLoggedIn) {
      return <Redirect to="/tasks" />;
    }
    return <Login />;
  };

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {redirectTo}
        </Route>
        <ProtectedRoute path="/tasks" component={Homepage} />
        <ProtectedAdmin path="/admin" component={AdminPage} />
        <ProtectedAdmin path="/admin/add-user" component={AdminPage} />
        <Route>
          <Notfound />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
