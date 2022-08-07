import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const TableRow = ({children, className}) => (
	<tr
		className={classNames(
			className,
			"text-left border rounded-2xl border-primaryLighter"
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
