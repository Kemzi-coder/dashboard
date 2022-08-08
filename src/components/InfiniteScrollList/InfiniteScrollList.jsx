import React, {useRef} from "react";
import PropTypes from "prop-types";
import useObserver from "../../hooks/useObserver.hook";

const InfiniteScrollList = ({
	children,
	isLoading,
	hasMore,
	onFetchMore,
	length
}) => {
	const lastElement = useRef(null);

	useObserver(lastElement, hasMore, isLoading, onFetchMore);

	return (
		<>
			{children}
			{length === 0 && !isLoading && "List is empty."}
			{isLoading && "Loading..."}
			<div ref={lastElement} />
		</>
	);
};

InfiniteScrollList.propTypes = {
	children: PropTypes.node.isRequired,
	isLoading: PropTypes.bool.isRequired,
	onFetchMore: PropTypes.func.isRequired,
	hasMore: PropTypes.bool.isRequired,
	length: PropTypes.number.isRequired
};

export default InfiniteScrollList;
