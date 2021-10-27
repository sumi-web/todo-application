import React from "react";

const Input = ({ name, type, placeholder, passwordVisibility, togglePasswordVisibility, error, ...props }) => {
	return (
		<div className={`form-box${error ? " error" : ""}`}>
			<input name={name} type={type} placeholder={placeholder} autoComplete="off" {...props} />
			{name === "password" &&
				(passwordVisibility ? (
					<i className="bi bi-eye-fill" onClick={togglePasswordVisibility}></i>
				) : (
					<i className="bi bi-eye-slash-fill" onClick={togglePasswordVisibility}></i>
				))}
		</div>
	);
};

export default Input;
