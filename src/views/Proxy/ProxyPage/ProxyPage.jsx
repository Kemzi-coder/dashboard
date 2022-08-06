import React from "react";
import {Outlet} from "react-router-dom";
import MainLayout from "../../../components/MainLayout/MainLayout";
import ProxyTabs from "../ProxyTabs/ProxyTabs";

const ProxyPage = () => (
	<MainLayout>
		<ProxyTabs />
		<div className="order-1 bg-primary container mx-auto py-8 px-16">
			<Outlet />
		</div>
	</MainLayout>
);

export default ProxyPage;
