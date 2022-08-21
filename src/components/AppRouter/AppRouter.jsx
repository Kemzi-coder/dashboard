import {observer} from "mobx-react-lite";
import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import authState from "../../store/auth";
import {
	ACCOUNTS_2FA_ROUTE,
	ACCOUNTS_BAD_ROUTE,
	ACCOUNTS_GOOD_ROUTE,
	ACCOUNTS_ROUTE,
	ACCOUNTS_SMS_ROUTE,
	APPS_CREATE_ROUTE,
	APPS_PRIVATE_ROUTE,
	APPS_ROUTE,
	CHAT_ROUTE,
	HOME_ROUTE,
	LOGIN_ROUTE,
	PROXIES_CREATE_ROUTE,
	PROXIES_PRIVATE_ROUTE,
	PROXIES_ROUTE,
	REGISTER_ROUTE,
	SETTINGS_NOTIFICATIONS_ROUTE,
	SETTINGS_ROUTE
} from "../../utils/constants/routes";
import AccountsPage from "../../views/Accounts/AccountsPage/AccountsPage";
import AccountsTable from "../../views/Accounts/AccountsTable/AccountsTable";
import AppsCreateForm from "../../views/Apps/AppsCreateForm/AppsCreateForm";
import AppsPage from "../../views/Apps/AppsPage/AppsPage";
import AppsTable from "../../views/Apps/AppsTable/AppsTable";
import AuthPage from "../../views/Auth/AuthPage/AuthPage";
import HomePage from "../../views/Home/HomePage/HomePage";
import HomeStats from "../../views/Home/HomeStats/HomeStats";
import ProxiesCreateForm from "../../views/Proxies/ProxiesCreateForm/ProxiesCreateForm";
import ProxiesPage from "../../views/Proxies/ProxiesPage/ProxiesPage";
import ProxiesTable from "../../views/Proxies/ProxiesTable/ProxiesTable";
import SettingsNotifications from "../../views/Settings/SettingsNotifications/SettingsNotifications";
import SettingsPage from "../../views/Settings/SettingsPage/SettingsPage";
import SettingsProfileForm from "../../views/Settings/SettingsProfileForm/SettingsProfileForm";
import ChatPage from "../../views/Chat/ChatPage/ChatPage";
import ChatBody from "../../views/Chat/ChatBody/ChatBody";

const AppRouter = observer(() => {
	if (authState.isAuth) {
		return (
			<Routes>
				<Route path={HOME_ROUTE} element={<HomePage />}>
					<Route index element={<HomeStats />} />
					<Route path="*" element={<Navigate to={HOME_ROUTE} />} />
				</Route>
				<Route path={ACCOUNTS_ROUTE} element={<AccountsPage />}>
					<Route index element={<AccountsTable />} />
					<Route path={ACCOUNTS_GOOD_ROUTE} element={<AccountsTable />} />
					<Route path={ACCOUNTS_BAD_ROUTE} element={<AccountsTable />} />
					<Route path={ACCOUNTS_SMS_ROUTE} element={<AccountsTable />} />
					<Route path={ACCOUNTS_2FA_ROUTE} element={<AccountsTable />} />
					<Route path="*" element={<Navigate to={ACCOUNTS_ROUTE} />} />
				</Route>
				<Route path={PROXIES_ROUTE} element={<ProxiesPage />}>
					<Route index element={<ProxiesTable />} />
					<Route path={PROXIES_PRIVATE_ROUTE} element={<ProxiesTable />} />
					<Route path={PROXIES_CREATE_ROUTE} element={<ProxiesCreateForm />} />
					<Route path="*" element={<Navigate to={PROXIES_ROUTE} />} />
				</Route>
				<Route path={APPS_ROUTE} element={<AppsPage />}>
					<Route index element={<AppsTable />} />
					<Route path={APPS_PRIVATE_ROUTE} element={<AppsTable />} />
					<Route path={APPS_CREATE_ROUTE} element={<AppsCreateForm />} />
					<Route path="*" element={<Navigate to={APPS_ROUTE} />} />
				</Route>
				<Route path={SETTINGS_ROUTE} element={<SettingsPage />}>
					<Route index element={<SettingsProfileForm />} />
					<Route
						path={SETTINGS_NOTIFICATIONS_ROUTE}
						element={<SettingsNotifications />}
					/>
					<Route path="*" element={<Navigate to={SETTINGS_ROUTE} />} />
				</Route>
				<Route path={CHAT_ROUTE} element={<ChatPage />}>
					<Route index element={<ChatBody />} />
					<Route path={`${CHAT_ROUTE}/:id`} element={<ChatBody />} />
					<Route path="*" element={<Navigate to={CHAT_ROUTE} />} />
				</Route>
				<Route path="*" element={<Navigate to={HOME_ROUTE} />} />
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
