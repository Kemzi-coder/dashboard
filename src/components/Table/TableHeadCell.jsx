import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const TableHeadCell = ({children, className}) => (
	<th className={classNames(className, "font-normal p-3")}>{children}</th>
);

TableHeadCell.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string
};

TableHeadCell.defaultProps = {
	className: ""
};

export default TableHeadCell;
