import React from "react";
import PropTypes from "prop-types";

const MainBody = ({children}) => (
	<div className="order-1 bg-primary container mx-auto py-8 px-16 min-w-0">
		{children}
	</div>
);

MainBody.propTypes = {
	children: PropTypes.node.isRequired
};

export default MainBody;
