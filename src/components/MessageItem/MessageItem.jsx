import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Avatar from "../Avatar/Avatar";

const MessageItem = ({isMine, className}) => (
	<div
		className={classNames(
			className,
			"flex items-end max-w-[50%] overflow-hidden"
		)}
	>
		<Avatar
			width={30}
			height={30}
			className="mr-3 flex-shrink-0"
			imagePath=""
			username="maxkemzi"
		/>
		<div
			className={classNames("px-4 py-2 border-2 rounded-base break-words", {
				"bg-accent border-accent-dark": isMine,
				"bg-primary-light border-primary-lighter": !isMine
			})}
		>
			Hello, Max! Hello, Max!Hello, Max!Hello, Max!Hello, Max!Hello, Max!Hello,
			Max!Hello, Max!Hello, Max!Hello, Max!ax!Hello, Max!ax!Hello, Max!ax!Hello,
			Max!ax!Hello, Max!ax!Hello, Max!ax!Hello, Max!ax!Hello, Max!ax!Hello,
			Max!ax!Hello, Max!
		</div>
	</div>
);

MessageItem.propTypes = {
	isMine: PropTypes.bool,
	className: PropTypes.string
};

MessageItem.defaultProps = {
	isMine: false,
	className: ""
};

export default MessageItem;
