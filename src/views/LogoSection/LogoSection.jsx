import React from "react";
import {FaTelegramPlane} from "react-icons/fa";
import {NavLink} from "react-router-dom";
import {HOME_ROUTE} from "../../utils/constants/routes";
import classNames from "classnames";

const LogoSection = ({className}) => {
	return (
		<div className={classNames(className, "p-8 bg-primary")}>
			<NavLink to={HOME_ROUTE} className="flex items-center">
				<FaTelegramPlane size={28} className="mr-4" />
				<p className="text-xl">Telegram Panel</p>
			</NavLink>
		</div>
	);
};

export default LogoSection;
