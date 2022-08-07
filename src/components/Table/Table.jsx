import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Table = ({children, className}) => (
	<table className={classNames(className, "table-fixed w-full")}>
		{children}
	</table>
);

Table.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string
};

Table.defaultProps = {
	className: ""
};

export default Table;
