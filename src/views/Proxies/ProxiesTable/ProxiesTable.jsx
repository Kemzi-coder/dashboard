import {observer} from "mobx-react-lite";
import React, {useCallback, useEffect, useMemo} from "react";
import ItemsTable from "../../../components/ItemsTable/ItemsTable";
import useFetchFns from "../../../hooks/useFetchFns.hook";
import proxies from "../../../store/proxies";
import {
	PROXIES_PRIVATE_ROUTE,
	PROXIES_ROUTE
} from "../../../utils/constants/routes";

const ProxiesTable = observer(() => {
	const params = useMemo(
		() => ({
			page: 1,
			per_page: proxies.limit,
			table: true
		}),
		[]
	);

	const [fetchProxies, fetchMoreProxies] = useFetchFns({
		[PROXIES_PRIVATE_ROUTE]: [proxies.fetchPrivate, proxies.fetchMorePrivate],
		[PROXIES_ROUTE]: [proxies.fetchShared, proxies.fetchMoreShared]
	});

	useEffect(() => {
		fetchProxies(params);
	}, [fetchProxies, params]);

	useEffect(() => () => proxies.setIsLoading(true), []);

	const fetchMore = useCallback(
		() => fetchMoreProxies({...params, page: proxies.page + 1}),
		[fetchMoreProxies, params]
	);

	const handleDelete = async uuid => proxies.delete(uuid);

	const handleEdit = uuid => async proxy => proxies.edit(uuid, proxy);

	const handleCheck = async uuid => proxies.check(uuid);

	return (
		<ItemsTable
			isLoadingMore={proxies.isLoadingMore}
			hasMore={proxies.hasMore}
			headCells={proxies.headCells}
			inAction={proxies.inAction}
			isLoading={proxies.isLoading}
			items={proxies.proxies}
			onCheck={handleCheck}
			onDelete={handleDelete}
			onEdit={handleEdit}
			fetchMore={fetchMore}
		/>
	);
});

export default ProxiesTable;
