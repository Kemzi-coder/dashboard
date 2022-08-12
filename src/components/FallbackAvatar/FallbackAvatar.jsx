import React from "react";
import {MdPerson} from "react-icons/md";
import classNames from "classnames";
import PropTypes from "prop-types";

const FallbackAvatar = ({className, width, height}) => (
	<div
		style={{width: `${width}px`, height: `${height}px`}}
		className={classNames(
			className,
			`border border-primaryLighter rounded-full relative`
		)}
	>
		<MdPerson
			className="absolute text-primaryLight top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
			size={24}
		/>
	</div>
);

FallbackAvatar.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	className: PropTypes.string
};

FallbackAvatar.defaultProps = {
	width: 40,
	height: 40,
	className: ""
};

export default FallbackAvatar;
