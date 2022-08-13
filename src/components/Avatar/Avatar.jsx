import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import FallbackAvatar from "../FallbackAvatar/FallbackAvatar";

const Avatar = ({imagePath, width, height, className, username}) => {
	if (!imagePath) {
		return (
			<FallbackAvatar
				username={username}
				width={width}
				height={height}
				className={className}
			/>
		);
	}

	return (
		<img
			width={width}
			height={height}
			style={{width: `${width}px`, height: `${height}px`}}
			className={classNames(
				className,
				"rounded-full object-cover block border-2 border-primary-lighter"
			)}
			src={imagePath}
			alt="avatar"
		/>
	);
};

Avatar.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	className: PropTypes.string,
	imagePath: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired
};

Avatar.defaultProps = {
	width: 40,
	height: 40,
	className: ""
};

export default Avatar;
