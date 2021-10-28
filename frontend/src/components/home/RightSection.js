import React from "react";

import { useRouteMatch, Redirect, Switch, Route } from "react-router-dom";

import HeaderBar from "./HeaderBar";
import Projects from "./Projects";
import Setting from "../home/setting/Setting";

const RightSection = () => {
	const { path } = useRouteMatch();

	return (
		<>
			<HeaderBar />
			{path === "/home/projects" ? <Projects /> : <Setting />}
		</>
	);
};

export default RightSection;
