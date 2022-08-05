import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Avatar = ({imagePath, width, height, className}) => (
	<img
		className={classNames(className, "rounded-full object-cover block")}
		width={width}
		height={height}
		src={imagePath}
		alt="avatar"
	/>
);

Avatar.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	className: PropTypes.string,
	imagePath: PropTypes.string.isRequired
};

Avatar.defaultProps = {
	width: 40,
	height: 40,
	className: ""
};

export default Avatar;
