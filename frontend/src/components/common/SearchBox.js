import React from "react";

const SearchBox = ({ placeholder }) => {
	return (
		<div className="search-input-box">
			<i class="bi bi-search"></i>
			<input type="text" placeholder={placeholder} />
		</div>
	);
};

export default SearchBox;
