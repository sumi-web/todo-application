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
		<div className="main-left-navigation-container">
			<div className="main-left-navigation">
				<div className="nav-link-group">
					<p className="nav-logo">.taskEZ</p>
					{leftTopNav.map(({ IconClass, title, url }) => (
						<NavLink key={title} to={"/main" + url} activeClassName="nav-active">
							<div className="nav-link">
								<i className={IconClass}></i>
								<span className="nav-title">{title}</span>
							</div>
						</NavLink>
					))}
				</div>
				<div className="nav-link-group nav-bottom-link">
					<NavLink to="/main/settings" activeClassName="nav-active">
						<div className="nav-link">
							<i className="bi bi-gear"></i>
							<span className="nav-title">Settings</span>
						</div>
					</NavLink>
					<div>
						<div className="nav-link cursor-pointer" onClick={logout}>
							<i class="bi bi-arrow-bar-right"></i>
							<span className="nav-title">Logout</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LeftSection;
