import React from "react";
import TabItem from "../../../components/TabItem/TabItem";
import TabList from "../../../components/TabList/TabList";
import {
	SETTINGS_NOTIFICATIONS_ROUTE,
	SETTINGS_ROUTE
} from "../../../utils/constants/routes";

const SettingsTabs = () => (
	<TabList>
		<TabItem text="Profile" path={SETTINGS_ROUTE} />
		<TabItem text="Notifications" path={SETTINGS_NOTIFICATIONS_ROUTE} />
	</TabList>
);

export default SettingsTabs;
