import React from "react";
import classNames from "classnames";

const StatItem = ({value, title, className}) => {
	return (
		<div
			className={classNames(
				className,
				"inline-block border py-4 px-8 rounded-2xl border-primaryLighter text-center"
			)}
		>
			<p className="text-4xl font-semibold mb-1 text-accent">{value}</p>
			<p className="text-lg capitalize whitespace-nowrap">{title}</p>
		</div>
	);
};

export default StatItem;
