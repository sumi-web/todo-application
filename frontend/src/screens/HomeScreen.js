import React from "react";

import LeftSection from "../components/home/LeftSection";
import RightSection from "../components/home/RightSection";

const DashboardScreen = () => {
	return (
		<div id="dashboard-screen">
			<div className="left-section">
				<LeftSection />
			</div>

			<div className="right-section">
				<RightSection />
			</div>
		</div>
	);
};

export default DashboardScreen;
