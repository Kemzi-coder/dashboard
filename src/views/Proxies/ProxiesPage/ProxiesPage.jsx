import React from "react";
import {Outlet} from "react-router-dom";
import MainLayout from "../../../components/MainLayout/MainLayout";
import ProxiesTabs from "../ProxiesTabs/ProxiesTabs";
import MainBody from "../../../components/MainBody/MainBody";

const ProxiesPage = () => (
	<MainLayout>
		<ProxiesTabs />
		<MainBody>
			<Outlet />
		</MainBody>
	</MainLayout>
);

export default ProxiesPage;
