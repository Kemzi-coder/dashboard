import React from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";

const NavbarItem = ({className, startIcon: Icon, text, path}) => (
	<NavLink
		to={path}
		className={({isActive}) =>
			classNames(
				className,
				"flex whitespace-nowrap px-12 items-center relative text-primaryLight font-medium hover:text-white transition-colors border-l-2 border-transparent",
				{"text-accent hover:text-accent border-accent": isActive}
			)
		}
	>
		<Icon className="mr-4" size={22} />
		{text}
	</NavLink>
);

NavbarItem.propTypes = {
	className: PropTypes.string,
	startIcon: PropTypes.elementType.isRequired,
	text: PropTypes.string.isRequired,
	path: PropTypes.string.isRequired
};

NavbarItem.defaultProps = {
	className: ""
};

export default NavbarItem;
