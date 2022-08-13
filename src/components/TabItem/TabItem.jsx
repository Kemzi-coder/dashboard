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
				"relative h-full flex items-center font-semibold text-lg transition-colors before:transition-colors inline-block before:h-0.5 before:w-full before:absolute before:bottom-0 before:left-0",
				{
					"text-accent before:bg-accent": isActive,
					"text-text-darker hover:text-text-dark before:bg-transparent":
						!isActive
				}
			)
		}
	>
		<span>{text}</span>
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
