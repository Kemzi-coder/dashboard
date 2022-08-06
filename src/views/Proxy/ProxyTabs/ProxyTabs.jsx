import React from "react";
import TabList from "../../../components/TabList/TabList";
import TabItem from "../../../components/TabItem/TabItem";
import {
	PROXY_CREATE_ROUTE,
	PROXY_PRIVATE_ROUTE,
	PROXY_SHARED_ROUTE
} from "../../../utils/constants/routes";

const ProxyTabs = () => (
	<TabList>
		<TabItem text="Shared" path={PROXY_SHARED_ROUTE} />
		<TabItem text="Private" path={PROXY_PRIVATE_ROUTE} />
		<TabItem text="Create" path={PROXY_CREATE_ROUTE} />
	</TabList>
);

export default ProxyTabs;
