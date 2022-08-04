import React from "react";
import TabItem from "../../../components/TabItem/TabItem";
import {HOME_STATISTICS_ROUTE} from "../../../utils/constants/routes";
import TabList from "../../../components/TabList/TabList";

const HomeTabs = () => (
	<TabList>
		<TabItem text="Statistics" path={HOME_STATISTICS_ROUTE} />
	</TabList>
);

export default HomeTabs;
