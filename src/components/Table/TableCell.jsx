import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const TableCell = ({children, className, ...props}) => (
	<td
		className={classNames(
			className,
			"py-3 px-3 text-ellipsis overflow-hidden whitespace-nowrap",
			{"cursor-pointer": !!props.onClick}
		)}
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
