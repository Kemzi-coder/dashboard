import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Table = ({children, className}) => (
	<div className="overflow-x-auto">
		<table
			className={classNames(
				className,
				"table-fixed whitespace-nowrap min-w-full"
			)}
		>
			{children}
		</table>
	</div>
);

Table.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string
};

Table.defaultProps = {
	className: ""
};

export default Table;
