import React from "react";
import PropTypes from "prop-types";
import LogoSection from "../../views/LogoSection/LogoSection";
import SidebarSection from "../../views/SidebarSection/SidebarSection";

const MainLayout = ({children}) => (
	<div className="grid min-h-screen gap-px grid-cols-[300px_1fr] bg-primary-lighter grid-rows-[auto_1fr] text-text-light">
		<LogoSection />
		{children}
		<SidebarSection />
	</div>
);

MainLayout.propTypes = {
	children: PropTypes.node.isRequired
};

export default MainLayout;
