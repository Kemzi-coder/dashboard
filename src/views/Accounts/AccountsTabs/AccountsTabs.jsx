import React from "react";
import TabList from "../../../components/TabList/TabList";
import TabItem from "../../../components/TabItem/TabItem";
import {
	ACCOUNTS_BAD_ROUTE,
	ACCOUNTS_GOOD_ROUTE,
	ACCOUNTS_2FA_ROUTE,
	ACCOUNTS_SMS_ROUTE,
	ACCOUNTS_ROUTE
} from "../../../utils/constants/routes";

const AccountsTabs = () => (
	<TabList>
		<TabItem text="All" path={ACCOUNTS_ROUTE} />
		<TabItem text="Good" path={ACCOUNTS_GOOD_ROUTE} />
		<TabItem text="Bad" path={ACCOUNTS_BAD_ROUTE} />
		<TabItem text="Sms" path={ACCOUNTS_SMS_ROUTE} />
		<TabItem text="2Fa" path={ACCOUNTS_2FA_ROUTE} />
	</TabList>
);

export default AccountsTabs;
