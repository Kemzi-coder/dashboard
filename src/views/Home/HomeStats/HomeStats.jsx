import {observer} from "mobx-react-lite";
import React, {useMemo} from "react";
import StatItem from "../../../components/StatItem/StatItem";
import Stats from "../../../store/stats";

const HomeStats = observer(() => {
	const {stats, isLoading} = Stats;
	const sortedStats = useMemo(
		() => Object.keys(stats).sort((a, b) => stats[a] < stats[b]),
		[stats]
	);

	return (
		<>
			<h2 className="text-4xl font-semibold mb-8">Statistics</h2>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<div className="gap-4 grid xl:grid-cols-4 lg:grid-cols-3 lg:gap-8 md:grid-cols-2">
					{sortedStats.map(key => (
						<StatItem key={key} value={stats[key]} title={`${key} Accounts`} />
					))}
				</div>
			)}
		</>
	);
});

export default HomeStats;
