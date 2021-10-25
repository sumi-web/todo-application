import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Router, Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { VerifyUserToken } from "./action/action-auth";
import AuthScreen from "./screens/AuthScreen";
import HomeScreen from "./screens/HomeScreen";

const Routes = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const isLoggedIn = useSelector((state) => state.auth_store.isLoggedIn);

	useEffect(() => {
		async function verifyToken() {
			const res = await dispatch(VerifyUserToken());
			if (res) history.push("/home");
		}
		verifyToken();
	}, [dispatch]);

	return (
		<Switch>
			<Route path="/auth/login-signup" component={AuthScreen} />
			<Route path="/home" component={HomeScreen} />
			<Route exact path="/">
				{/*  will put logic if logged in or not */}
				{isLoggedIn ? <Redirect to="/home" /> : <Redirect to="/auth/login-signup" />}
			</Route>
		</Switch>
	);
};

export default Routes;
