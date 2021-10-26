import React from "react";

import SearchBox from "../common/SearchBox";
import AllImages from "../../assets/all-images.png";
import UserImage from "../../assets/photo-1494790108377-be9c29b29330.jfif";
import { useSelector } from "react-redux";

const HeaderBar = () => {
	const userInfo = useSelector((state) => state.auth_store.authCredentials);

	console.log("check usr", userInfo);

	return (
		<div className="top-header-bar">
			<div className="top">
				<div className="search-box">
					<SearchBox placeholder="Search.." />
				</div>
				<div className="user-info-images">
					<img className="all-images" src={AllImages} alt="all-images" />
					<div className="user-info">
						<h1>Hi {userInfo.name}</h1>
						<img src={UserImage} alt="user" />
					</div>
				</div>
			</div>

			<div className="bottom">
				<div className="projects-filter-bar">
					<h2>Projects</h2>
					<div className="filter-container">
						<i class="bi bi-filter"></i>
						<h3>Filter</h3>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeaderBar;
