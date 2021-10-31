import React from "react";

import { Link } from "react-router-dom";

import SearchBox from "../common/SearchBox";
import UserImage from "../../assets/image1.png";
import { useSelector } from "react-redux";
import UserImages from "../common/UserImages";

const HeaderBar = () => {
	const userInfo = useSelector((state) => state.auth_store.authCredentials);

	return (
		<div className="top-header-bar">
			<div className="top">
				<div className="search-box">
					<SearchBox placeholder="Search.." />
				</div>
				<UserImages />
				<div className="user-info">
					<h1>Hi {userInfo.name}</h1>
					<Link to="/home/settings">
						<img src={userInfo.userImage ? userInfo.userImage : UserImage} alt="user" />
					</Link>
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
