import React from "react";
import {Outlet} from "react-router-dom";
import MainLayout from "../../../components/MainLayout/MainLayout";
import ProxyTabs from "../ProxyTabs/ProxyTabs";
import MainBody from "../../../components/MainBody/MainBody";

const ProxyPage = () => (
	<MainLayout>
		<ProxyTabs />
		<MainBody>
			<Outlet />
		</MainBody>
	</MainLayout>
);

export default ProxyPage;
