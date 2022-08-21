import React from "react";
import PropTypes from "prop-types";
import {observer} from "mobx-react-lite";
import authState from "../../store/auth";
import Avatar from "../Avatar/Avatar";

const MainTopbar = observer(({children}) => (
	<div className="px-16 flex bg-primary">
		{children}
		<div className="ml-auto flex items-center">
			<Avatar
				className="mr-2"
				imagePath={authState.user.avatar}
				username={authState.user.username}
			/>
			<p className="w-28 overflow-hidden text-ellipsis whitespace-nowrap">
				{authState.user.username}
			</p>
		</div>
	</div>
));

MainTopbar.propTypes = {
	children: PropTypes.node
};

MainTopbar.defaultProps = {
	children: undefined
};

export default MainTopbar;
