import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const TableButtonVariants = ["success", "warning", "danger"];

const TableButton = ({children, className, variant, ...props}) => {
	const getTableButtonClasses = () =>
		classNames({
			"text-success bg-success": variant === "success",
			"text-warning bg-warning": variant === "warning",
			"text-danger bg-danger": variant === "danger"
		});

	return (
		<button
			type="button"
			className={classNames(
				className,
				getTableButtonClasses(),
				"rounded-2xl py-1 text-sm px-2 text-primary font-semibold"
			)}
			{...props}
		>
			{children}
		</button>
	);
};

TableButton.propTypes = {
	variant: PropTypes.oneOf(TableButtonVariants),
	children: PropTypes.node.isRequired,
	className: PropTypes.string
};

TableButton.defaultProps = {
	className: "",
	variant: TableButtonVariants[0]
};

export default TableButton;
