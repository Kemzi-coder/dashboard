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
				"flex whitespace-nowrap capitalize px-12 items-center relative font-medium transition-colors border-l-2",
				{
					"text-accent hover:text-accent border-accent": isActive,
					"text-text-darker hover:text-text-dark border-transparent": !isActive
				}
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
