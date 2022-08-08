import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const TableHeadCell = ({children, className, ...props}) => (
	<th
		className={classNames(className, "font-normal px-4 py-3 capitalize")}
		{...props}
	>
		{children}
	</th>
);

TableHeadCell.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string
};

TableHeadCell.defaultProps = {
	className: ""
};

export default TableHeadCell;
