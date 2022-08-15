import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Avatar from "../Avatar/Avatar";

const ChatItem = ({isActive, title, lastMsgDate}) => {
	const formattedDate = new Date(lastMsgDate).toLocaleString("en-US", {
		hour: "numeric",
		minute: "numeric",
		hour12: true
	});

	return (
		<div
			className={classNames(
				"relative px-4 py-2 transition-colors w-full overflow-hidden",
				{"bg-accent": isActive, "hover:bg-primary-light": !isActive}
			)}
		>
			<button
				aria-label="chat"
				className="absolute top-0 left-0 w-full h-full z-10"
				type="button"
			/>
			<div className="flex overflow-hidden">
				<Avatar
					className="mr-4 flex-shrink-0"
					width={50}
					height={50}
					imagePath=""
					username="maxkemzi"
				/>
				<div className="flex flex-col overflow-hidden flex-grow">
					<div className="flex justify-between overflow-hidden">
						<p className="mr-2 overflow-hidden whitespace-nowrap text-ellipsis">
							{title}
						</p>
						<p
							className={classNames("whitespace-nowrap uppercase", {
								"text-text-dark": !isActive,
								"text-text-light": isActive
							})}
						>
							{formattedDate}
						</p>
					</div>
					<p
						className={classNames(
							"overflow-hidden whitespace-nowrap text-ellipsis",
							{
								"text-text-dark": !isActive,
								"text-text-light": isActive
							}
						)}
					>
						message
					</p>
				</div>
			</div>
		</div>
	);
};

ChatItem.propTypes = {
	isActive: PropTypes.bool,
	title: PropTypes.string.isRequired,
	lastMsgDate: PropTypes.string.isRequired
};

ChatItem.defaultProps = {
	isActive: false
};

export default ChatItem;
