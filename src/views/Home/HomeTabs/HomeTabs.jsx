import React from "react";
import TabItem from "../../../components/TabItem/TabItem";
import {HOME_STATISTICS_ROUTE} from "../../../utils/constants/routes";

const HomeTabs = () => (
	<div className="bg-primary px-16 space-x-8">
		<TabItem text="Statistics" path={HOME_STATISTICS_ROUTE} />
	</div>
);

export default HomeTabs;
