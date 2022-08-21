import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {autorun} from "mobx";
import accountsState from "../../../store/accounts";
import {
	ACCOUNTS_2FA_ROUTE,
	ACCOUNTS_BAD_ROUTE,
	ACCOUNTS_GOOD_ROUTE,
	ACCOUNTS_ROUTE,
	ACCOUNTS_SMS_ROUTE,
	CHAT_ROUTE
} from "../../../utils/constants/routes";
import ItemsTable from "../../../components/ItemsTable/ItemsTable";
import useLoadFns from "../../../hooks/useLoadFns.hook";

const AccountsTable = observer(() => {
	const location = useLocation();
	const navigate = useNavigate();

	const loadAllByStatus = status => params =>
		accountsState.loadAll({
			...params,
			status
		});

	const loadAccounts = useLoadFns(
		{
			[ACCOUNTS_GOOD_ROUTE]: loadAllByStatus("good"),
			[ACCOUNTS_BAD_ROUTE]: loadAllByStatus("bad"),
			[ACCOUNTS_2FA_ROUTE]: loadAllByStatus("2fa"),
			[ACCOUNTS_SMS_ROUTE]: loadAllByStatus("sms"),
			[ACCOUNTS_ROUTE]: loadAllByStatus("")
		},
		accountsState.clearAll,
		accountsState.clear
	);

	useEffect(
		() =>
			autorun(() =>
				loadAccounts({page: accountsState.page, per_page: accountsState.limit})
			),
		[loadAccounts]
	);

	const handleLoadMore = () => accountsState.setPage(accountsState.page + 1);

	const redirectToChat = () =>
		navigate(CHAT_ROUTE, {state: {prevPath: location.pathname}});

	const handleEdit = uuid => async account => accountsState.edit(uuid, account);

	const handleDelete = async uuid => accountsState.delete(uuid);

	const handleOpen = async uuid =>
		accountsState.loadAccountToken(uuid, redirectToChat);

	return (
		<ItemsTable
			isLoading={accountsState.isLoading}
			isLoadingMore={accountsState.isLoadingMore}
			onEdit={handleEdit}
			onOpen={handleOpen}
			onDelete={handleDelete}
			onLoadMore={handleLoadMore}
			headCells={accountsState.headCells}
			inAction={accountsState.inAction}
			hasMore={accountsState.hasMore}
			items={accountsState.accounts}
		/>
	);
});

export default AccountsTable;
