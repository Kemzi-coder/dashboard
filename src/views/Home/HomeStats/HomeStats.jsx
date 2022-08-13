import {observer} from "mobx-react-lite";
import React, {useEffect, useMemo, useState} from "react";
import {
	MdOutlineKeyboardArrowLeft,
	MdOutlineKeyboardArrowRight
} from "react-icons/md";
import StatItem from "../../../components/StatItem/StatItem";
import Stats from "../../../store/stats";

const HomeStats = observer(() => {
	const {stats, isLoading} = Stats;
	const [slideIndex, setSlideIndex] = useState(0);
	const statKeys = useMemo(() => Object.keys(stats), [stats]);

	const slidesPerView = 5;
	const slideWidth = 100 / slidesPerView;
	const spaceBetween = 16;

	useEffect(() => {
		const lastIndex = statKeys.length - slidesPerView;

		if (slideIndex < 0) {
			setSlideIndex(lastIndex);
		}

		if (slideIndex > lastIndex) {
			setSlideIndex(0);
		}
	}, [slideIndex, statKeys.length]);

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
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<div className="overflow-hidden mx-auto relative">
					<div
						className="flex relative transition-transform"
						style={{
							transform: `translateX(-${slideWidth * slideIndex}%)`,
							margin: `0 -${spaceBetween / 2}px`
						}}
					>
						{statKeys.map(key => (
							<div
								key={key}
								className="flex-shrink-0"
								style={{
									padding: `0 ${spaceBetween / 2}px`,
									width: `${slideWidth}%`
								}}
							>
								<StatItem
									className="px-0 w-full"
									value={stats[key]}
									title={`${key} Accounts`}
								/>
							</div>
						))}
					</div>
				</div>
			)}
		</>
	);
});

export default HomeStats;
