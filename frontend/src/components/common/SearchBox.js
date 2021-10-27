import React from "react";

const SearchBox = ({ placeholder }) => {
	return (
		<div className="search-input-box">
			<i className="bi bi-search"></i>
			<input type="text" placeholder={placeholder} />
		</div>
	);
};

export default SearchBox;
