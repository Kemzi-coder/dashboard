import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const BurgerButton = ({className}) => (
	<button
		className={classNames(
			className,
			"relative w-[20px] h-[17px] before:absolute before:top-0 before:left-0 before:w-full before:bg-text-dark before:h-[2px] after:absolute after:bottom-0 after:left-0 after:w-full after:bg-text-dark after:h-[2px] before:rounded-base after:rounded-base"
		)}
		type="button"
		aria-label="menu button"
	>
		<span className="absolute rounded-base top-1/2 w-full left-0 -translate-y-1/2 bg-text-dark h-[2px]" />
	</button>
);

BurgerButton.propTypes = {
	className: PropTypes.string
};

BurgerButton.defaultProps = {
	className: ""
};

export default BurgerButton;
