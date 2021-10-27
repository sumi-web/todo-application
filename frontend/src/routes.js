import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Switch, Route, Redirect } from "react-router-dom";
import { VerifyUserToken } from "./action/action-auth";
import FullScreenLoader from "./components/common/FullScreenLoader";
import AuthScreen from "./screens/AuthScreen";
import HomeScreen from "./screens/HomeScreen";

const Routes = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [isLoading, setIsLoading] = useState(false);

	const isLoggedIn = useSelector((state) => state.auth_store.authCredentials._id || false);

	useEffect(() => {
		async function verifyToken() {
			setIsLoading(true);
			const res = await dispatch(VerifyUserToken());
			setIsLoading(false);
			res ? history.push("/home/projects") : history.push("/auth/login-signup");
		}
		verifyToken();
	}, [dispatch, history]);

	return (
		<>
			{isLoading ? (
				<FullScreenLoader />
			) : (
				<Switch>
					<Route path="/auth/login-signup" component={AuthScreen} />
					<Route path="/home/projects" component={HomeScreen} />
					<Route exact path="/">
						{isLoggedIn ? <Redirect to="/home" /> : <Redirect to="/auth/login-signup" />}
					</Route>
				</Switch>
			)}
		</>
	);
};

export default Routes;
