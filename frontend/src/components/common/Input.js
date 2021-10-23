import React from "react";

const Input = ({ name, type, placeholder, error, ...props }) => {
	return (
		<div className="form-box">
			<input name={name} type={type} placeholder={placeholder} {...props} />
		</div>
	);
};

export default Input;
