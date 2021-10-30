import React from "react";

import SearchBox from "../common/SearchBox";
import AllImages from "../../assets/all-images.png";
import UserImage from "../../assets/image1.png";
import { useSelector } from "react-redux";

const HeaderBar = () => {
	const userInfo = useSelector((state) => state.auth_store.authCredentials);

	return (
		<div className="top-header-bar">
			<div className="top">
				<div className="search-box">
					<SearchBox placeholder="Search.." />
				</div>

				<img className="all-images" src={AllImages} alt="all-images" />
				<div className="user-info">
					<h1>Hi {userInfo.name}</h1>
					<img src={UserImage} alt="user" />
				</div>
			</div>

			<div className="bottom">
				<div className="projects-filter-bar">
					<h2>Projects</h2>
					<div className="filter-container">
						<i className="bi bi-filter"></i>
						<h3>Filter</h3>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeaderBar;
