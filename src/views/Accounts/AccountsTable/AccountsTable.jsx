import React, {useCallback, useEffect, useRef} from "react";
import {useLocation} from "react-router-dom";
import {observer} from "mobx-react-lite";
import AccountItem from "../../../components/AccountItem/AccountItem";
import CopyModal from "../../../components/CopyModal/CopyModal";
import {
	Table,
	TableBody,
	TableHead,
	TableHeadCell,
	TableRow
} from "../../../components/Table";
import useCopyModal from "../../../hooks/useCopyModal.hook";
import useObserver from "../../../hooks/useObserver.hook";
import Accounts from "../../../store/accounts";
import Stats from "../../../store/stats";
import {
	ACCOUNTS_2FA_ROUTE,
	ACCOUNTS_BAD_ROUTE,
	ACCOUNTS_GOOD_ROUTE,
	ACCOUNTS_SMS_ROUTE
} from "../../../utils/constants/routes";

const AccountsTable = observer(() => {
	const location = useLocation();
	const lastElement = useRef(null);
	const {isLoading, accounts, page, hasMore, limit} = Accounts;

	const copyModal = useRef(null);
	const {handleClick, isCopied, setIsCopied} = useCopyModal(copyModal);

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
		<>
			<CopyModal
				ref={copyModal}
				isCopied={isCopied}
				setIsCopied={setIsCopied}
			/>
			<Table>
				<TableHead>
					<TableRow>
						<TableHeadCell className="w-1/12">No.</TableHeadCell>
						<TableHeadCell>Status</TableHeadCell>
						<TableHeadCell>Photo</TableHeadCell>
						<TableHeadCell>Name</TableHeadCell>
						<TableHeadCell>Username</TableHeadCell>
						<TableHeadCell>Phone</TableHeadCell>
						<TableHeadCell>UUID</TableHeadCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{accounts.map((account, index) => (
						<AccountItem
							onClick={handleClick}
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
				</TableBody>
			</Table>
			{accounts.length === 0 && !isLoading && "Table is empty."}
			{isLoading && "Loading..."}
			<div ref={lastElement} />
		</>
	);
});

export default AccountsTable;
