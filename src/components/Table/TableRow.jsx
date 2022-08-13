import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const TableRow = ({children, className}) => (
	<tr
		className={classNames(
			className,
			"text-left border-2 bg-primary-light border-primary-lighter"
		)}
	>
		{children}
	</tr>
);

TableRow.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string
};

TableRow.defaultProps = {
	className: ""
};

export default TableRow;
