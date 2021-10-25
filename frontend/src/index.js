import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";

import "./style/main.scss";

import { store } from "./reducer";

import App from "./App";

ReactDom.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
