import React, {useRef} from "react";
import PropTypes from "prop-types";
import useObserver from "../../hooks/useObserver.hook";

const InfiniteScrollList = ({
	children,
	isLoading,
	hasMore,
	onLoadMore,
	isLoadingMore,
	length
}) => {
	const lastElement = useRef(null);

	useObserver(lastElement, hasMore, isLoadingMore, onLoadMore);

	return (
		<>
			{length === 0 && !isLoading ? (
				"List is empty."
			) : (
				<>
					{isLoading ? "Loading..." : children}
					{isLoadingMore && "Loading..."}
				</>
			)}
			<div ref={lastElement} />
		</>
	);
};

InfiniteScrollList.propTypes = {
	children: PropTypes.node.isRequired,
	isLoading: PropTypes.bool.isRequired,
	isLoadingMore: PropTypes.bool.isRequired,
	onLoadMore: PropTypes.func.isRequired,
	hasMore: PropTypes.bool.isRequired,
	length: PropTypes.number.isRequired
};

export default InfiniteScrollList;
