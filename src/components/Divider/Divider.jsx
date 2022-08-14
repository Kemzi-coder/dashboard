import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const Divider = ({className}) => (
	<div className={classNames(className, "border-b border-primary-lighter")} />
);

Divider.propTypes = {
	className: PropTypes.string
};

Divider.defaultProps = {
	className: ""
};

export default Divider;
