import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const Button = ({children, className, size, ...props}) => (
	<button
		type="button"
		className={classNames(
			className,
			"rounded-2xl py-2 px-4 text-white bg-accent uppercase font-semibold text-lg disabled:bg-primaryLight",
			{"text-lg": size === "big", "text-base": size === "medium"}
		)}
		{...props}
	>
		{children}
	</button>
);

Button.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	size: PropTypes.oneOf(["big", "medium"])
};

Button.defaultProps = {
	className: "",
	size: "big"
};

export default Button;
