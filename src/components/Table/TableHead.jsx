import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const TableHead = ({children, className}) => (
	<thead className={classNames(className, "border-b-2 border-transparent")}>
		{children}
	</thead>
);

TableHead.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string
};

TableHead.defaultProps = {
	className: ""
};

export default TableHead;
