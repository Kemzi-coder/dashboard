import React from "react";
import PropTypes from "prop-types";
import LogoSection from "../../views/LogoSection/LogoSection";
import SidebarSection from "../../views/SidebarSection/SidebarSection";

const MainLayout = ({children}) => (
	<div className="grid gap-px grid-cols-[300px_1fr] grid-rows-[auto_minmax(900px,_1fr)] bg-primaryLighter text-white">
		<LogoSection />
		{children}
		<SidebarSection />
	</div>
);

MainLayout.propTypes = {
	children: PropTypes.node.isRequired
};

export default MainLayout;
