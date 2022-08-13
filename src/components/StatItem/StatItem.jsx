import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const StatItem = ({value, title, className}) => (
	<div
		className={classNames(
			className,
			"inline-block py-4 px-8 rounded-base bg-primary-light border-2 border-primary-lighter text-center"
		)}
	>
		<p className="text-4xl font-semibold mb-1 text-accent">{value}</p>
		<p className="text-lg capitalize whitespace-nowrap">{title}</p>
	</div>
);

StatItem.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	title: PropTypes.string.isRequired,
	className: PropTypes.string
};

StatItem.defaultProps = {
	className: ""
};

export default StatItem;
