import {observer} from "mobx-react-lite";
import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Auth from "../../store/auth";
import {
	ACCOUNTS_GOOD_ROUTE,
	ACCOUNTS_ROUTE,
	ACCOUNTS_BAD_ROUTE,
	HOME_ROUTE,
	HOME_STATISTICS_ROUTE,
	LOGIN_ROUTE,
	ACCOUNTS_SMS_ROUTE,
	ACCOUNTS_2FA_ROUTE,
	REGISTER_ROUTE,
	PROXY_ROUTE,
	PROXY_SHARED_ROUTE,
	PROXY_PRIVATE_ROUTE,
	PROXY_CREATE_ROUTE
} from "../../utils/constants/routes";
import AccountsPage from "../../views/Accounts/AccountsPage/AccountsPage";
import AuthPage from "../../views/Auth/AuthPage/AuthPage";
import HomePage from "../../views/Home/HomePage/HomePage";
import HomeStats from "../../views/Home/HomeStats/HomeStats";
import ProxyPage from "../../views/Proxy/ProxyPage/ProxyPage";
import ProxyTable from "../../views/Proxy/ProxyTable/ProxyTable";
import ProxyCreateForm from "../../views/Proxy/ProxyCreateForm/ProxyCreateForm";

const AppRouter = observer(() => {
	const {isAuth} = Auth;

	if (isAuth) {
		return (
			<Routes>
				<Route path={HOME_ROUTE} element={<HomePage />}>
					<Route
						index
						element={<Navigate to={HOME_STATISTICS_ROUTE} replace />}
					/>
					<Route path={HOME_STATISTICS_ROUTE} element={<HomeStats />} />
					<Route path="*" element={<Navigate to={HOME_STATISTICS_ROUTE} />} />
				</Route>
				<Route path={ACCOUNTS_ROUTE} element={<AccountsPage />}>
					<Route index element={<Navigate to={ACCOUNTS_ROUTE} replace />} />
					<Route path={ACCOUNTS_GOOD_ROUTE} element={<AccountsPage />} />
					<Route path={ACCOUNTS_BAD_ROUTE} element={<AccountsPage />} />
					<Route path={ACCOUNTS_SMS_ROUTE} element={<AccountsPage />} />
					<Route path={ACCOUNTS_2FA_ROUTE} element={<AccountsPage />} />
					<Route path="*" element={<Navigate to={ACCOUNTS_ROUTE} />} />
				</Route>
				<Route path={PROXY_ROUTE} element={<ProxyPage />}>
					<Route index element={<Navigate to={PROXY_SHARED_ROUTE} replace />} />
					<Route path={PROXY_SHARED_ROUTE} element={<ProxyTable />} />
					<Route path={PROXY_PRIVATE_ROUTE} element={<ProxyTable />} />
					<Route path={PROXY_CREATE_ROUTE} element={<ProxyCreateForm />} />
					<Route path="*" element={<Navigate to={PROXY_SHARED_ROUTE} />} />
				</Route>
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
