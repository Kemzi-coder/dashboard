import React, {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {observer} from "mobx-react-lite";
import MainLayout from "../../../components/MainLayout/MainLayout";
import Accounts from "../../../store/accounts";
import {
	ACCOUNTS_BAD_ROUTE,
	ACCOUNTS_GOOD_ROUTE,
	ACCOUNTS_2FA_ROUTE,
	ACCOUNTS_SMS_ROUTE
} from "../../../utils/constants/routes";
import AccountsTabs from "../AccountsTabs/AccountsTabs";
import AccountItem from "../../../components/AccountItem/AccountItem";

const AccountsPage = observer(() => {
	const location = useLocation();
	const {isLoading, accounts} = Accounts;

	useEffect(() => {
		switch (location.pathname) {
			case ACCOUNTS_GOOD_ROUTE:
				Accounts.fetchAll({status: "good"});
				break;
			case ACCOUNTS_BAD_ROUTE:
				Accounts.fetchAll({status: "bad"});
				break;
			case ACCOUNTS_2FA_ROUTE:
				Accounts.fetchAll({status: "2fa"});
				break;
			case ACCOUNTS_SMS_ROUTE:
				Accounts.fetchAll({status: "sms"});
				break;
			default:
				Accounts.fetchAll();
		}
	}, [location.pathname]);

	useEffect(() => () => Accounts.setAccounts([]), []);

	return (
		<MainLayout>
			<AccountsTabs />
			<div className="order-1 bg-primary container mx-auto py-8 px-16">
				{isLoading ? (
					<div>Loading...</div>
				) : (
					<table className="table-fixed w-full">
						<thead className="border-b-2 border-transparent">
							<tr className="text-left font-light border rounded-2xl border-primaryLighter">
								<th className="py-3 px-3">No.</th>
								<th className="py-3 px-3">UUID</th>
								<th className="py-3 px-3">Photo</th>
								<th className="py-3 px-3">Name</th>
								<th className="py-3 px-3">Username</th>
								<th className="py-3 px-3">Phone</th>
								<th className="py-3 px-3">Status</th>
							</tr>
						</thead>
						<tbody>
							{accounts.map((account, index) => (
								<AccountItem
									firstName={account.profile.first_name}
									lastName={account.profile.last_name}
									number={index + 1}
									phone={account.profile.phone}
									photo={account.profile.photo}
									status={account.status}
									username={account.profile.username}
									uuid={account.uuid}
									key={account.uuid}
								/>
							))}
						</tbody>
					</table>
				)}
			</div>
		</MainLayout>
	);
});

export default AccountsPage;
