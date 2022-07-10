import React from "react";
import PropTypes from "prop-types";

const Navbar = ({children, className}) => (
	<nav className={className}>
		<ul className="flex flex-col space-y-6">{children}</ul>
	</nav>
);

Navbar.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string
};

Navbar.defaultProps = {
	className: ""
};

export default Navbar;
