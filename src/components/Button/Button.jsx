import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const Button = ({children, className, size, ...props}) => (
	<button
		type="button"
		className={classNames(
			className,
			"rounded-base py-2 px-6 text-text-light bg-accent font-semibold disabled:bg-primary-light transition-colors hover:bg-accent-btn",
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
