import React from "react";

import { useRouteMatch, useLocation, Redirect, Switch, Route } from "react-router-dom";

import HeaderBar from "./HeaderBar";
import Projects from "./Projects";
import Setting from "./setting";

const RightSection = () => {
	const { path } = useRouteMatch();

	const { pathname } = useLocation();

	console.log("check", pathname);

	return (
		<>
			<HeaderBar />

			<Switch>
				<Route path={path + "/projects"} component={Projects} />
				{/* <Route path={path + "/edit-todo"} component={EditTodo} /> */}
				<Route path={path + "/settings"} component={Setting} />
				<Route exact path={path}>
					<Redirect to={path + "/projects"} />
				</Route>
			</Switch>
		</>
	);
};

export default RightSection;
