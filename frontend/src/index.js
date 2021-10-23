import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";

import "./style/main.scss";

import { store } from "./reducer";

import App from "./App";

ReactDom.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
