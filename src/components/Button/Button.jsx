import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const Button = ({children, className, ...props}) => (
	<button
		type="button"
		className={classNames(
			className,
			"rounded-2xl py-2 px-4 text-white bg-accent uppercase font-semibold text-lg disabled:bg-primaryLight"
		)}
		{...props}
	>
		{children}
	</button>
);

Button.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string
};

Button.defaultProps = {
	className: ""
};

export default Button;
