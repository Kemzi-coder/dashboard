import React from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames";

const TabItem = ({className, text, path}) => {
	return (
		<NavLink
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
};

export default TabItem;
