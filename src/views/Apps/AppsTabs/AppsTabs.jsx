import React from "react";
import TabItem from "../../../components/TabItem/TabItem";
import TabList from "../../../components/TabList/TabList";
import {
	APPS_CREATE_ROUTE,
	APPS_PRIVATE_ROUTE,
	APPS_ROUTE
} from "../../../utils/constants/routes";

const AppsTabs = () => (
	<TabList>
		<TabItem text="Shared" path={APPS_ROUTE} />
		<TabItem text="Private" path={APPS_PRIVATE_ROUTE} />
		<TabItem text="Create" path={APPS_CREATE_ROUTE} />
	</TabList>
);

export default AppsTabs;
