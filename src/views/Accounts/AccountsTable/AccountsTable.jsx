import {observer} from "mobx-react-lite";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useLocation} from "react-router-dom";
import accounts from "../../../store/accounts";
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

	const params = useMemo(
		() => ({page: 1, per_page: accounts.limit, table: true, status}),
		[status]
	);

	useEffect(() => {
		accounts.fetchAll(params);
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
		() => accounts.fetchMore({...params, page: accounts.page + 1}),
		[params]
	);

	useEffect(() => () => accounts.setIsLoading(true), []);

	const handleEdit = uuid => async account => accounts.edit(uuid, account);

	const handleDelete = async uuid => accounts.delete(uuid);

	return (
		<ItemsTable
			isLoading={accounts.isLoading}
			isLoadingMore={accounts.isLoadingMore}
			onEdit={handleEdit}
			onDelete={handleDelete}
			fetchMore={fetchMore}
			headCells={accounts.headCells}
			inAction={accounts.inAction}
			hasMore={accounts.hasMore}
			items={accounts.accounts}
		/>
	);
});

export default AccountsTable;
