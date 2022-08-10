import {observer} from "mobx-react-lite";
import React, {useEffect, useMemo} from "react";
import ItemsTable from "../../../components/ItemsTable/ItemsTable";
import useFetchFns from "../../../hooks/useFetchFns.hook";
import Proxies from "../../../store/proxies";
import {
	PROXY_PRIVATE_ROUTE,
	PROXY_SHARED_ROUTE
} from "../../../utils/constants/routes";

const ProxyTable = observer(() => {
	const {isLoading, proxies, page, hasMore, limit, inAction, headCells} =
		Proxies;
	const params = useMemo(
		() => ({
			page: 1,
			per_page: limit,
			table: true
		}),
		[limit]
	);

	const [fetchProxies, fetchMoreProxies] = useFetchFns({
		[PROXY_PRIVATE_ROUTE]: [Proxies.fetchPrivate, Proxies.fetchMorePrivate],
		[PROXY_SHARED_ROUTE]: [Proxies.fetchShared, Proxies.fetchMoreShared]
	});

	useEffect(() => {
		fetchProxies(params);
	}, [fetchProxies, params]);

	useEffect(() => () => Proxies.setProxies([]), []);

	const handleDelete = async uuid => Proxies.delete(uuid);

	const handleEdit = uuid => async proxy => Proxies.edit(uuid, proxy);

	return (
		<ItemsTable
			hasMore={hasMore}
			headCells={headCells}
			inAction={inAction}
			isLoading={isLoading}
			items={proxies}
			onDelete={handleDelete}
			onEdit={handleEdit}
			fetchMore={() => fetchMoreProxies({...params, page: page + 1})}
		/>
	);
});

export default ProxyTable;
