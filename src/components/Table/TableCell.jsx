import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const TableCell = ({children, className, onClick, ...props}) => (
	<td
		className={classNames(className, "px-4 py-3", {
			"cursor-pointer": onClick !== undefined
		})}
		{...props}
	>
		{children}
	</td>
);

TableCell.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	onClick: PropTypes.func
};

TableCell.defaultProps = {
	children: null,
	className: "",
	onClick: null
};

export default TableCell;
