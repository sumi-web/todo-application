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
			<Projects />

			{/* <Switch> */}
			{/* <Route path={pathname + "/projects"} component={Projects} /> */}
			{/* <Route path={path + "/edit-todo"} component={EditTodo} /> */}
			{/* <Route path={pathname + "/settings"} component={Setting} /> */}
			{/* <Route exact path={pathname}> */}
			{/* <Redirect to={pathname} /> */}
			{/* </Route> */}
			{/* </Switch> */}
		</>
	);
};

export default RightSection;
