import {observer} from "mobx-react-lite";
import React, {useCallback, useEffect, useMemo, useRef} from "react";
import {useLocation} from "react-router-dom";
import AccountItem from "../../../components/AccountItem/AccountItem";
import CopyModal from "../../../components/CopyModal/CopyModal";
import InfiniteScrollList from "../../../components/InfiniteScrollList/InfiniteScrollList";
import {
	Table,
	TableBody,
	TableHead,
	TableHeadCell,
	TableRow
} from "../../../components/Table";
import useCopyModal from "../../../hooks/useCopyModal.hook";
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
	const {isLoading, accounts, page, hasMore, limit} = Accounts;

	const copyModal = useRef(null);
	const {handleClick, isCopied, setIsCopied} = useCopyModal(copyModal);

	const generalParams = useMemo(() => ({page: 1, per_page: limit}), [limit]);

	const getParamsByStatus = useCallback(
		(params, status) => ({...params, status}),
		[]
	);

	const fetchMore = useCallback(() => {
		const fetchMoreParams = {...generalParams, page: page + 1};

		switch (location.pathname) {
			case ACCOUNTS_GOOD_ROUTE:
				Accounts.fetchMore(getParamsByStatus(fetchMoreParams, "good"));
				break;
			case ACCOUNTS_BAD_ROUTE:
				Accounts.fetchMore(getParamsByStatus(fetchMoreParams, "bad"));
				break;
			case ACCOUNTS_2FA_ROUTE:
				Accounts.fetchMore(getParamsByStatus(fetchMoreParams, "2fa"));
				break;
			case ACCOUNTS_SMS_ROUTE:
				Accounts.fetchMore(getParamsByStatus(fetchMoreParams, "sms"));
				break;
			default:
				Accounts.fetchMore(fetchMoreParams);
		}
	}, [generalParams, getParamsByStatus, location.pathname, page]);

	useEffect(() => {
		Stats.fetchAll();
	}, []);

	useEffect(() => {
		switch (location.pathname) {
			case ACCOUNTS_GOOD_ROUTE:
				Accounts.fetchAll(getParamsByStatus(generalParams, "good"));
				break;
			case ACCOUNTS_BAD_ROUTE:
				Accounts.fetchAll(getParamsByStatus(generalParams, "bad"));
				break;
			case ACCOUNTS_2FA_ROUTE:
				Accounts.fetchAll(getParamsByStatus(generalParams, "2fa"));
				break;
			case ACCOUNTS_SMS_ROUTE:
				Accounts.fetchAll(getParamsByStatus(generalParams, "sms"));
				break;
			default:
				Accounts.fetchAll(generalParams);
		}
	}, [generalParams, getParamsByStatus, limit, location.pathname]);

	useEffect(() => () => Accounts.setAccounts([]), []);

	return (
		<InfiniteScrollList
			hasMore={hasMore}
			isLoading={isLoading}
			length={accounts.length}
			onFetchMore={fetchMore}
		>
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
		</InfiniteScrollList>
	);
});

export default AccountsTable;
