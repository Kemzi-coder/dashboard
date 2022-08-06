import React from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";

const TabItem = ({className, text, path, isDisabled}) => (
	<NavLink
		end
		onClick={
			isDisabled
				? e => {
						e.preventDefault();
				  }
				: null
		}
		to={path}
		className={({isActive}) =>
			classNames(
				className,
				"font-semibold py-8 text-lg border-b-2 transition-colors inline-block",
				{
					"text-accent border-accent hover:text-accent": isActive,
					"text-primaryLight border-transparent hover:text-white": !isActive
				}
			)
		}
	>
		{text}
	</NavLink>
);

TabItem.propTypes = {
	text: PropTypes.string.isRequired,
	path: PropTypes.string.isRequired,
	isDisabled: PropTypes.bool,
	className: PropTypes.string
};

TabItem.defaultProps = {
	isDisabled: false,
	className: ""
};

export default TabItem;
