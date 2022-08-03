import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {
	HOME_STATISTICS_ROUTE,
	LOGIN_ROUTE,
	REGISTER_ROUTE
} from "../../utils/constants/routes";
import HomePage from "../../views/Home/HomePage/HomePage";
import Auth from "../../store/auth";
import AuthPage from "../../views/Auth/AuthPage/AuthPage";

const AppRouter = observer(() => {
	const {isAuth} = Auth;

	if (isAuth) {
		return (
			<Routes>
				<Route path={HOME_STATISTICS_ROUTE} element={<HomePage />} />
				<Route path="*" element={<Navigate to={HOME_STATISTICS_ROUTE} />} />
			</Routes>
		);
	}

	return (
		<Routes>
			<Route path={LOGIN_ROUTE} element={<AuthPage />} />
			<Route path={REGISTER_ROUTE} element={<AuthPage />} />
			<Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
		</Routes>
	);
});

export default AppRouter;
