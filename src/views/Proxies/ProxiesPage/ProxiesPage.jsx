import React from "react";
import {Outlet} from "react-router-dom";
import MainLayout from "../../../components/MainLayout/MainLayout";
import ProxiesTabs from "../ProxiesTabs/ProxiesTabs";
import MainBody from "../../../components/MainBody/MainBody";
import MainTopbar from "../../../components/MainTopbar/MainTopbar";

const ProxiesPage = () => (
	<MainLayout>
		<MainTopbar>
			<ProxiesTabs />
		</MainTopbar>
		<MainBody>
			<Outlet />
		</MainBody>
	</MainLayout>
);

export default ProxiesPage;
