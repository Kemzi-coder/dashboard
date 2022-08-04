import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const TabList = ({children, className}) => (
	<div className={classNames(className, "bg-primary px-16 space-x-8")}>
		{children}
	</div>
);

TabList.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired
};

TabList.defaultProps = {
	className: ""
};

export default TabList;
