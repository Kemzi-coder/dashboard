import React from "react";
import TabItem from "../../../components/TabItem/TabItem";
import TabList from "../../../components/TabList/TabList";
import {
	PROXIES_CREATE_ROUTE,
	PROXIES_PRIVATE_ROUTE,
	PROXIES_ROUTE
} from "../../../utils/constants/routes";

const ProxiesTabs = () => (
	<TabList>
		<TabItem text="Shared" path={PROXIES_ROUTE} />
		<TabItem text="Private" path={PROXIES_PRIVATE_ROUTE} />
		<TabItem text="Create" path={PROXIES_CREATE_ROUTE} />
	</TabList>
);

export default ProxiesTabs;
