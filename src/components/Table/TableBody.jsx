import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const TableBody = ({children, className}) => (
	<tbody className={classNames(className)}>{children}</tbody>
);

TableBody.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string
};

TableBody.defaultProps = {
	className: ""
};

export default TableBody;
