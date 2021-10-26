import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Switch, Route, Redirect } from "react-router-dom";
import { VerifyUserToken } from "./action/action-auth";
import AuthScreen from "./screens/AuthScreen";
import HomeScreen from "./screens/HomeScreen";

const Routes = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const isLoggedIn = useSelector((state) => state.auth_store.authCredentials._id || false);

	useEffect(() => {
		async function verifyToken() {
			const res = await dispatch(VerifyUserToken());

			res ? history.push("/home/projects") : history.push("/auth/login-signup");
		}
		verifyToken();
	}, [dispatch, history]);

	return (
		<Switch>
			<Route path="/auth/login-signup" component={AuthScreen} />
			<Route path="/home/projects" component={HomeScreen} />
			<Route exact path="/">
				{/*  will put logic if logged in or not */}
				{isLoggedIn ? <Redirect to="/home" /> : <Redirect to="/auth/login-signup" />}
			</Route>
		</Switch>
	);
};

export default Routes;
