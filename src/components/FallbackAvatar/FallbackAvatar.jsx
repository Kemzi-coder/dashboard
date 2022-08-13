import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const FallbackAvatar = ({className, width, height, username}) => {
	const letter = username.trim().charAt(0).toUpperCase();
	return (
		<div
			style={{width: `${width}px`, height: `${height}px`}}
			className={classNames(
				className,
				`border-2 border-accent-dark rounded-full relative bg-accent-darker`
			)}
		>
			<span
				style={{fontSize: `${(22 * (width + height)) / 100}px`}}
				className="text-accent font-semibold absolute uppercase top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
			>
				{letter}
			</span>
		</div>
	);
};

FallbackAvatar.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	className: PropTypes.string,
	username: PropTypes.string.isRequired
};

FallbackAvatar.defaultProps = {
	width: 40,
	height: 40,
	className: ""
};

export default FallbackAvatar;
