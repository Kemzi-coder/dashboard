import React from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import {HOME_STATISTICS_ROUTE} from "../../utils/constants/routes";
import HomePage from "../../views/Home/HomePage/HomePage";

const AppRouter = () => {
	return (
		<Routes>
			<Route path={HOME_STATISTICS_ROUTE} element={<HomePage />} />
			<Route path="*" element={<Navigate to={HOME_STATISTICS_ROUTE} />} />
		</Routes>
	);
};

export default AppRouter;