import React from "react";
import { Router, Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import AuthScreen from "./screens/AuthScreen";
import DashboardScreen from "./screens/DashboardScreen";

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/auth/login-signup" component={AuthScreen} />
				<Route path="/dashboard" component={DashboardScreen} />
				<Route exact path="/">
					{/*  will put logic if logged in or not */}
					<Redirect to="/auth/login-signup" />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
