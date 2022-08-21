import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {autorun} from "mobx";
import TabList from "../../../components/TabList/TabList";
import TabItem from "../../../components/TabItem/TabItem";
import {
	ACCOUNTS_2FA_ROUTE,
	ACCOUNTS_BAD_ROUTE,
	ACCOUNTS_GOOD_ROUTE,
	ACCOUNTS_ROUTE,
	ACCOUNTS_SMS_ROUTE
} from "../../../utils/constants/routes";
import statsState from "../../../store/stats";
import accountsState from "../../../store/accounts";

const AccountsTabs = observer(() => {
	const loadingString = "...";
	const isDisabled = accountsState.isLoading;

	const getStatValue = name =>
		statsState.isLoading ? loadingString : statsState.stats[name];

	useEffect(() => autorun(() => statsState.loadAll()), []);

	useEffect(() => () => statsState.clear(), []);

	return (
		<TabList>
			<TabItem
				text={`All (${getStatValue("total")})`}
				path={ACCOUNTS_ROUTE}
				isDisabled={isDisabled}
			/>
			<TabItem
				text={`Good (${getStatValue("good")})`}
				path={ACCOUNTS_GOOD_ROUTE}
				isDisabled={isDisabled}
			/>
			<TabItem
				text={`Bad (${getStatValue("bad")})`}
				path={ACCOUNTS_BAD_ROUTE}
				isDisabled={isDisabled}
			/>
			<TabItem
				text={`Sms (${getStatValue("sms")})`}
				path={ACCOUNTS_SMS_ROUTE}
				isDisabled={isDisabled}
			/>
			<TabItem
				text={`2FA (${getStatValue("2fa")})`}
				path={ACCOUNTS_2FA_ROUTE}
				isDisabled={isDisabled}
			/>
		</TabList>
	);
});

export default AccountsTabs;
