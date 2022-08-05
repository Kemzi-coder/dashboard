import React from "react";
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
import Stats from "../../../store/stats";
import Accounts from "../../../store/accounts";

const AccountsTabs = observer(() => {
	const {stats, isLoading} = Stats;
	const loadingString = "...";

	return (
		<TabList>
			<TabItem
				text={`All (${isLoading ? loadingString : stats.total})`}
				path={ACCOUNTS_ROUTE}
				isDisabled={Accounts.isLoading}
			/>
			<TabItem
				text={`Good (${isLoading ? loadingString : stats.good})`}
				path={ACCOUNTS_GOOD_ROUTE}
				isDisabled={Accounts.isLoading}
			/>
			<TabItem
				text={`Bad (${isLoading ? loadingString : stats.bad})`}
				path={ACCOUNTS_BAD_ROUTE}
				isDisabled={Accounts.isLoading}
			/>
			<TabItem
				text={`Sms (${isLoading ? loadingString : stats.sms})`}
				path={ACCOUNTS_SMS_ROUTE}
				isDisabled={Accounts.isLoading}
			/>
			<TabItem
				text={`2FA (${isLoading ? loadingString : stats["2fa"]})`}
				path={ACCOUNTS_2FA_ROUTE}
				isDisabled={Accounts.isLoading}
			/>
		</TabList>
	);
});

export default AccountsTabs;
