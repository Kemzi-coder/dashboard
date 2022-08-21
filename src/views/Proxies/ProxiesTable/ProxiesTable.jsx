import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";
import {autorun} from "mobx";
import ItemsTable from "../../../components/ItemsTable/ItemsTable";
import proxiesState from "../../../store/proxies";
import {
	PROXIES_PRIVATE_ROUTE,
	PROXIES_ROUTE
} from "../../../utils/constants/routes";
import useLoadFns from "../../../hooks/useLoadFns.hook";

const ProxiesTable = observer(() => {
	const loadProxies = useLoadFns(
		{
			[PROXIES_PRIVATE_ROUTE]: proxiesState.loadPrivate,
			[PROXIES_ROUTE]: proxiesState.loadShared
		},
		proxiesState.clearAll,
		proxiesState.clear
	);

	useEffect(
		() =>
			autorun(() =>
				loadProxies({
					page: proxiesState.page,
					per_page: proxiesState.limit,
					table: true
				})
			),
		[loadProxies]
	);

	const handleLoadMore = () => proxiesState.setPage(proxiesState.page + 1);

	const handleDelete = async uuid => proxiesState.delete(uuid);

	const handleEdit = uuid => async proxy => proxiesState.edit(uuid, proxy);

	const handleCheck = async uuid => proxiesState.check(uuid);

	return (
		<ItemsTable
			isLoadingMore={proxiesState.isLoadingMore}
			hasMore={proxiesState.hasMore}
			headCells={proxiesState.headCells}
			inAction={proxiesState.inAction}
			isLoading={proxiesState.isLoading}
			items={proxiesState.proxies}
			onCheck={handleCheck}
			onDelete={handleDelete}
			onEdit={handleEdit}
			onLoadMore={handleLoadMore}
		/>
	);
});

export default ProxiesTable;
