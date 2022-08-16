import React from "react";
import {MdArrowBack} from "react-icons/md";
import {NavLink, useLocation} from "react-router-dom";
import Avatar from "../../../components/Avatar/Avatar";
import {ACCOUNTS_ROUTE} from "../../../utils/constants/routes";

const ChatHeader = () => {
	const location = useLocation();
	return (
		<div className="flex items-center justify-between border-b border-r border-primary-lighter p-6">
			<div className="flex items-center">
				<Avatar
					className="mr-4"
					width={50}
					height={50}
					imagePath=""
					username="maxkemzi"
				/>
				<p>maxkemzi</p>
			</div>
			<NavLink to={location?.state?.prevPath || ACCOUNTS_ROUTE}>
				<MdArrowBack className="text-text-dark" size={22} />
			</NavLink>
		</div>
	);
};

export default ChatHeader;
