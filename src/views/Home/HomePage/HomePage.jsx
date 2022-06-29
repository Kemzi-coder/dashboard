import React from "react";
import TabItem from "../../../components/TabItem/TabItem";
import {HOME_STATISTICS_ROUTE} from "../../../utils/constants/routes";

const HomePage = () => {
	return (
		<>
			<div className="bg-primary px-16 space-x-8">
				<TabItem text="Statistics" path={HOME_STATISTICS_ROUTE} />
			</div>
			<div className="order-1 bg-primary">Home</div>
		</>
	);
};

export default HomePage;
