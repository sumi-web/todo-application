import React from "react";
import { NavLink, useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import { UserLogout } from "../../action/action-auth";

import { leftTopNav } from "../../data";

const LeftSection = () => {
	const dispatch = useDispatch();

	const history = useHistory();

	const logout = async () => {
		if (window.confirm("Are you sure you want to logout?")) {
			await dispatch(UserLogout());
			history.push("/auth/login-signup");
		}
	};

	return (
		<div className="sidebar-container">
			<div className="sidebar-navigation-container">
				<div className="nav-link-box top">
					<p className="nav-title">.taskEZ</p>
					{leftTopNav.map((data, i) => (
						<NavLink key={i} to={"/home" + data.url} activeClassName="nav-active">
							<div className="nav-link">
								<i className={data.IconClass}></i>
								<span>{data.title}</span>
							</div>
						</NavLink>
					))}
				</div>
				<div className="nav-link-box bottom">
					<NavLink to="/home/settings" activeClassName="nav-active">
						<div className="nav-link">
							<i className="bi bi-gear"></i>
							<span>Settings</span>
						</div>
					</NavLink>
					<div>
						<div className="nav-link nav-logout" onClick={logout}>
							<i className="bi bi-arrow-bar-right"></i>
							<span>Logout</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LeftSection;
