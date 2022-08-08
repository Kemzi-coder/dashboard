import React from "react";
import {Outlet} from "react-router-dom";
import MainLayout from "../../../components/MainLayout/MainLayout";
import AppsTabs from "../AppsTabs/AppsTabs";
import MainBody from "../../../components/MainBody/MainBody";

const AppsPage = () => (
	<MainLayout>
		<AppsTabs />
		<MainBody>
			<Outlet />
		</MainBody>
	</MainLayout>
);

export default AppsPage;
