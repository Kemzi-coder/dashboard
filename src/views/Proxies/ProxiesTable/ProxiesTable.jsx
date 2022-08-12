import {observer} from "mobx-react-lite";
import React, {useEffect, useMemo} from "react";
import ItemsTable from "../../../components/ItemsTable/ItemsTable";
import useFetchFns from "../../../hooks/useFetchFns.hook";
import Proxies from "../../../store/proxies";
import {
	PROXIES_PRIVATE_ROUTE,
	PROXIES_ROUTE
} from "../../../utils/constants/routes";

const ProxiesTable = observer(() => {
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
		[PROXIES_PRIVATE_ROUTE]: [Proxies.fetchPrivate, Proxies.fetchMorePrivate],
		[PROXIES_ROUTE]: [Proxies.fetchShared, Proxies.fetchMoreShared]
	});

	useEffect(() => {
		fetchProxies(params);
	}, [fetchProxies, params]);

	useEffect(() => () => Proxies.setProxies([]), []);

	const handleDelete = async uuid => Proxies.delete(uuid);

	const handleEdit = uuid => async proxy => Proxies.edit(uuid, proxy);

	const handleCheck = async uuid => Proxies.check(uuid);

	return (
		<ItemsTable
			hasMore={hasMore}
			headCells={headCells}
			inAction={inAction}
			isLoading={isLoading}
			items={proxies}
			onCheck={handleCheck}
			onDelete={handleDelete}
			onEdit={handleEdit}
			fetchMore={() => fetchMoreProxies({...params, page: page + 1})}
		/>
	);
});

export default ProxiesTable;
