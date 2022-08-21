import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {
	MdOutlineKeyboardArrowLeft,
	MdOutlineKeyboardArrowRight
} from "react-icons/md";
import {autorun} from "mobx";
import StatItem from "../../../components/StatItem/StatItem";
import statsState from "../../../store/stats";

const HomeStats = observer(() => {
	const [slideIndex, setSlideIndex] = useState(0);

	const slidesPerView = 5;
	const slideWidth = 100 / slidesPerView;
	const spaceBetween = 16;

	const wrapperTransform = `translateX(-${slideWidth * slideIndex}%)`;
	const wrapperMargin = `0 -${spaceBetween / 2}px`;

	const statKeys = Object.keys(statsState.stats);

	useEffect(() => autorun(() => statsState.loadAll()), []);

	useEffect(
		() =>
			autorun(() => {
				const lastIndex = statKeys.length - slidesPerView;

				if (slideIndex < 0) {
					setSlideIndex(lastIndex);
				}

				if (slideIndex > lastIndex) {
					setSlideIndex(0);
				}
			}),
		[slideIndex, statKeys.length]
	);

	useEffect(() => () => statsState.clear(), []);

	const handleNext = () => setSlideIndex(prev => prev + 1);
	const handlePrev = () => setSlideIndex(prev => prev - 1);

	return (
		<>
			<div className="flex items-center justify-between mb-8">
				<h2 className="text-4xl font-semibold">Statistics</h2>
				{statKeys.length > slidesPerView && (
					<div className="flex items-center">
						<button className="mr-2" onClick={handlePrev} type="button">
							<MdOutlineKeyboardArrowLeft size={22} />
						</button>
						<button onClick={handleNext} type="button">
							<MdOutlineKeyboardArrowRight size={22} />
						</button>
					</div>
				)}
			</div>
			{statsState.isLoading ? (
				"Loading..."
			) : (
				<div className="overflow-hidden mx-auto relative">
					<div
						className="flex relative transition-transform"
						style={{transform: wrapperTransform, margin: wrapperMargin}}
					>
						{statKeys.map(key => {
							const value = statsState.stats[key];
							const title = `${key} Accounts`;
							const padding = `0 ${spaceBetween / 2}px`;
							const width = `${slideWidth}%`;

							return (
								<div
									key={key}
									className="flex-shrink-0"
									style={{padding, width}}
								>
									<StatItem
										className="px-0 w-full"
										value={value}
										title={title}
									/>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</>
	);
});

export default HomeStats;
