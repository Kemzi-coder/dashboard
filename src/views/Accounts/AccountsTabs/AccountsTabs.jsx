import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import TabList from "../../../components/TabList/TabList";
import TabItem from "../../../components/TabItem/TabItem";
import {
	ACCOUNTS_BAD_ROUTE,
	ACCOUNTS_GOOD_ROUTE,
	ACCOUNTS_2FA_ROUTE,
	ACCOUNTS_SMS_ROUTE,
	ACCOUNTS_ROUTE
} from "../../../utils/constants/routes";
import stats from "../../../store/stats";
import accounts from "../../../store/accounts";

const AccountsTabs = observer(() => {
	const loadingString = "...";

	useEffect(() => {
		stats.fetchAll();
	}, []);

	return (
		<TabList>
			<TabItem
				text={`All (${stats.isLoading ? loadingString : stats.stats.total})`}
				path={ACCOUNTS_ROUTE}
				isDisabled={accounts.isLoading}
			/>
			<TabItem
				text={`Good (${stats.isLoading ? loadingString : stats.stats.good})`}
				path={ACCOUNTS_GOOD_ROUTE}
				isDisabled={accounts.isLoading}
			/>
			<TabItem
				text={`Bad (${stats.isLoading ? loadingString : stats.stats.bad})`}
				path={ACCOUNTS_BAD_ROUTE}
				isDisabled={accounts.isLoading}
			/>
			<TabItem
				text={`Sms (${stats.isLoading ? loadingString : stats.stats.sms})`}
				path={ACCOUNTS_SMS_ROUTE}
				isDisabled={accounts.isLoading}
			/>
			<TabItem
				text={`2FA (${stats.isLoading ? loadingString : stats.stats["2fa"]})`}
				path={ACCOUNTS_2FA_ROUTE}
				isDisabled={accounts.isLoading}
			/>
		</TabList>
	);
});

export default AccountsTabs;
