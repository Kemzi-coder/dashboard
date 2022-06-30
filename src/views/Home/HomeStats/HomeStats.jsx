import React from "react";
import StatItem from "../../../components/StatItem/StatItem";

const HomeStats = () => {
	return (
		<div className="gap-4 grid xl:grid-cols-4 lg:grid-cols-3 lg:gap-8 md:grid-cols-2">
			<StatItem value="34" title="Total Accounts" />
			<StatItem value="34" title="Total Accounts" />
			<StatItem value="34" title="Total Accounts" />
			<StatItem value="34" title="Total Accounts" />
		</div>
	);
};

export default HomeStats;
