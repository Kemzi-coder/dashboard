import React from "react";
import TabList from "../../../components/TabList/TabList";
import TabItem from "../../../components/TabItem/TabItem";
import {
	APPS_SHARED_ROUTE,
	APPS_PRIVATE_ROUTE,
	APPS_CREATE_ROUTE
} from "../../../utils/constants/routes";

const AppsTabs = () => (
	<TabList>
		<TabItem text="Shared" path={APPS_SHARED_ROUTE} />
		<TabItem text="Private" path={APPS_PRIVATE_ROUTE} />
		<TabItem text="Create" path={APPS_CREATE_ROUTE} />
	</TabList>
);

export default AppsTabs;
