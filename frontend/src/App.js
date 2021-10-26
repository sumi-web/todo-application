import React from "react";
import { useSelector } from "react-redux";

import LeftSection from "./components/home/LeftSection";
import Routes from "./routes";

const App = () => {
	const isLoggedIn = useSelector((state) => state.auth_store.authCredentials._id || false);

	return (
		<div id="todo-app-screen" className={isLoggedIn ? "active" : ""}>
			{isLoggedIn && (
				<div className="left-section">
					<LeftSection />
				</div>
			)}
			<Routes />
		</div>
	);
};

export default App;
