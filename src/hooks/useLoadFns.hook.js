import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

const useLoadFns = (options, clearAllFn, clearFn) => {
	const location = useLocation();
	const [fn, setFn] = useState(() => () => {});

	useEffect(() => {
		clearAllFn();
	}, [clearAllFn, fn]);

	useEffect(() => () => clearFn(), [clearFn]);

	useEffect(() => {
		Object.keys(options).forEach(key => {
			if (location.pathname === key) {
				setFn(() => options[key]);
			}
		});
	}, [location.pathname, options]);

	return fn;
};

export default useLoadFns;
