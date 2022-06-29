import React from "react";

const Navbar = ({children, className}) => {
	return (
		<nav className={className}>
			<ul className="flex flex-col space-y-6">{children}</ul>
		</nav>
	);
};

export default Navbar;