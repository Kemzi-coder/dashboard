import {observer} from "mobx-react-lite";
import React, {useCallback, useEffect, useRef} from "react";
import {useLocation} from "react-router-dom";
import AccountItem from "../../../components/AccountItem/AccountItem";
import MainLayout from "../../../components/MainLayout/MainLayout";
import useObserver from "../../../hooks/useObserver.hook";
import Accounts from "../../../store/accounts";
import Stats from "../../../store/stats";
import {
	ACCOUNTS_2FA_ROUTE,
	ACCOUNTS_BAD_ROUTE,
	ACCOUNTS_GOOD_ROUTE,
	ACCOUNTS_SMS_ROUTE
} from "../../../utils/constants/routes";
import AccountsTabs from "../AccountsTabs/AccountsTabs";

const AccountsPage = observer(() => {
	const location = useLocation();
	const lastElement = useRef(null);
	const {isLoading, accounts, page, totalPageCount, limit} = Accounts;

	const hasMore = page < totalPageCount;

	const fetchMore = useCallback(() => {
		switch (location.pathname) {
			case ACCOUNTS_GOOD_ROUTE:
				Accounts.fetchMore({page: page + 1, per_page: limit, status: "good"});
				break;
			case ACCOUNTS_BAD_ROUTE:
				Accounts.fetchMore({page: page + 1, per_page: limit, status: "bad"});
				break;
			case ACCOUNTS_2FA_ROUTE:
				Accounts.fetchMore({page: page + 1, per_page: limit, status: "2fa"});
				break;
			case ACCOUNTS_SMS_ROUTE:
				Accounts.fetchMore({page: page + 1, per_page: limit, status: "sms"});
				break;
			default:
				Accounts.fetchMore({page: page + 1, per_page: limit});
		}
	}, [limit, location.pathname, page]);

	useEffect(() => {
		Stats.fetchAll();
	}, []);

	useEffect(() => {
		switch (location.pathname) {
			case ACCOUNTS_GOOD_ROUTE:
				Accounts.fetchAll({page: 1, per_page: limit, status: "good"});
				break;
			case ACCOUNTS_BAD_ROUTE:
				Accounts.fetchAll({page: 1, per_page: limit, status: "bad"});
				break;
			case ACCOUNTS_2FA_ROUTE:
				Accounts.fetchAll({page: 1, per_page: limit, status: "2fa"});
				break;
			case ACCOUNTS_SMS_ROUTE:
				Accounts.fetchAll({page: 1, per_page: limit, status: "sms"});
				break;
			default:
				Accounts.fetchAll({page: 1, per_page: limit});
		}
	}, [limit, location.pathname]);

	useEffect(() => () => Accounts.setAccounts([]), []);

	useObserver(lastElement, hasMore, isLoading, fetchMore);

	return (
		<MainLayout>
			<AccountsTabs />
			<div className="order-1 bg-primary container mx-auto py-8 px-16">
				<table className="table-fixed w-full">
					<thead className="border-b-2 border-transparent">
						<tr className="text-left [&_th]:font-normal [&_th]:py-3 [&_th]:px-3 border rounded-2xl border-primaryLighter">
							<th className="w-1/12">No.</th>
							<th>Status</th>
							<th>Photo</th>
							<th>Name</th>
							<th>Username</th>
							<th>Phone</th>
							<th>UUID</th>
						</tr>
					</thead>
					<tbody>
						{accounts.map((account, index) => (
							<AccountItem
								key={account.uuid}
								firstName={account?.profile?.first_name}
								lastName={account?.profile?.last_name}
								number={index + 1}
								phone={account?.profile?.phone}
								photo={account?.profile?.photo}
								status={account.status}
								username={account?.profile?.username}
								uuid={account.uuid}
							/>
						))}
					</tbody>
				</table>
				<div ref={lastElement} />
				{isLoading && "Loading..."}
			</div>
		</MainLayout>
	);
});

export default AccountsPage;
