import {useMemo} from "react";
import {useLocation} from "react-router-dom";

const useFetchFns = options => {
	const location = useLocation();

	return useMemo(() => {
		let result = [];

		Object.keys(options).forEach(key => {
			if (location.pathname === key) {
				result = options[key];
			}
		});

		return result;
	}, [location.pathname, options]);
};

export default useFetchFns;
