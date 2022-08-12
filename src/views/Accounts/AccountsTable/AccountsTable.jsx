import {observer} from "mobx-react-lite";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useLocation} from "react-router-dom";
import Accounts from "../../../store/accounts";
import Stats from "../../../store/stats";
import {
	ACCOUNTS_2FA_ROUTE,
	ACCOUNTS_BAD_ROUTE,
	ACCOUNTS_GOOD_ROUTE,
	ACCOUNTS_SMS_ROUTE
} from "../../../utils/constants/routes";
import ItemsTable from "../../../components/ItemsTable/ItemsTable";

const AccountsTable = observer(() => {
	const location = useLocation();
	const [status, setStatus] = useState("");
	const {isLoading, accounts, page, hasMore, limit, headCells, inAction} =
		Accounts;

	const params = useMemo(
		() => ({page: 1, per_page: limit, table: true, status}),
		[limit, status]
	);

	useEffect(() => {
		Stats.fetchAll();
	}, []);

	useEffect(() => {
		Accounts.fetchAll(params);
	}, [params, status]);

	useEffect(() => {
		switch (location.pathname) {
			case ACCOUNTS_GOOD_ROUTE:
				setStatus("good");
				break;
			case ACCOUNTS_BAD_ROUTE:
				setStatus("bad");
				break;
			case ACCOUNTS_2FA_ROUTE:
				setStatus("2fa");
				break;
			case ACCOUNTS_SMS_ROUTE:
				setStatus("sms");
				break;
			default:
				setStatus("");
		}
	}, [location.pathname]);

	const fetchMore = useCallback(
		() => Accounts.fetchMore({...params, page: page + 1}),
		[params, page]
	);

	useEffect(() => () => Accounts.setAccounts([]), []);

	const handleEdit = uuid => async account => Accounts.edit(uuid, account);

	const handleDelete = async uuid => Accounts.delete(uuid);

	return (
		<ItemsTable
			isLoading={isLoading}
			onEdit={handleEdit}
			onDelete={handleDelete}
			fetchMore={fetchMore}
			headCells={headCells}
			inAction={inAction}
			hasMore={hasMore}
			items={accounts}
		/>
	);
});

export default AccountsTable;
