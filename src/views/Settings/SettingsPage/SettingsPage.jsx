import React from "react";
import {Outlet} from "react-router-dom";
import MainLayout from "../../../components/MainLayout/MainLayout";
import SettingsTabs from "../SettingsTabs/SettingsTabs";
import MainBody from "../../../components/MainBody/MainBody";
import MainTopbar from "../../../components/MainTopbar/MainTopbar";

const SettingsPage = () => (
	<MainLayout>
		<MainTopbar>
			<SettingsTabs />
		</MainTopbar>
		<MainBody>
			<Outlet />
		</MainBody>
	</MainLayout>
);

export default SettingsPage;
