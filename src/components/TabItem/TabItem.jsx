import React from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";

const TabItem = ({className, text, path}) => (
	<NavLink
		end
		to={path}
		className={({isActive}) =>
			classNames(
				className,
				"font-semibold py-8 text-primaryLight text-lg border-b-2 border-transparent hover:text-white transition-colors inline-block",
				{"text-accent border-accent hover:text-accent": isActive}
			)
		}
	>
		{text}
	</NavLink>
);

TabItem.propTypes = {
	text: PropTypes.string.isRequired,
	path: PropTypes.string.isRequired,
	className: PropTypes.string
};

TabItem.defaultProps = {
	className: ""
};

export default TabItem;
