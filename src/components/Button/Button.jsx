import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const Button = ({children, startIcon: Icon, className, size, ...props}) => (
	<button
		type="button"
		className={classNames(
			className,
			"rounded-base py-2 px-6 text-text-light bg-accent font-semibold disabled:bg-primary-light transition-colors hover:bg-accent-btn",
			{
				"text-lg": size === "big",
				"text-base": size === "medium",
				"flex items-center": !!Icon
			}
		)}
		{...props}
	>
		{Icon && <Icon size={22} className="mr-2" />}
		{children}
	</button>
);

Button.propTypes = {
	startIcon: PropTypes.elementType,
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	size: PropTypes.oneOf(["big", "medium"])
};

Button.defaultProps = {
	startIcon: null,
	className: "",
	size: "big"
};

export default Button;
