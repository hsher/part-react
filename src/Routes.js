import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Settings from "./containers/Settings";
import ChangePassword from "./containers/ChangePassword";
import NotFound from "./containers/NotFound";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AuthenticatedRoute path="/" exact component={Home} appProps={appProps} />
      <UnauthenticatedRoute path="/login" exact component={Login} appProps={appProps} />
      <UnauthenticatedRoute
        path="/signup"
        exact
        component={Signup}
        appProps={appProps}
      />
      <AuthenticatedRoute
        path="/settings"
        exact
        component={Settings}
        appProps={appProps}
      />
      <AuthenticatedRoute
        path="/settings/password"
        exact
        component={ChangePassword}
        appProps={appProps}
      />
      {/* Finally, catch all unmatched routes */}
      <Route component={NotFound} />
    </Switch>
  );
}
