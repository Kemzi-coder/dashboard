import {useRef, useEffect} from "react";

const useObserver = (ref, hasMore, isLoading, callback) => {
	const observer = useRef(null);

	useEffect(() => {
		if (isLoading) {
			return;
		}

		if (observer.current) {
			observer.current.disconnect();
		}

		const cb = entries => {
			if (entries[0].isIntersecting && hasMore) {
				callback();
			}
		};

		observer.current = new IntersectionObserver(cb);
		observer.current.observe(ref.current);
	}, [callback, hasMore, isLoading, ref]);
};

export default useObserver;
