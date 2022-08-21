import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";
import {autorun} from "mobx";
import ItemsTable from "../../../components/ItemsTable/ItemsTable";
import useLoadFns from "../../../hooks/useLoadFns.hook";
import appsState from "../../../store/apps";
import {APPS_PRIVATE_ROUTE, APPS_ROUTE} from "../../../utils/constants/routes";

const AppsTable = observer(() => {
	const loadApps = useLoadFns(
		{
			[APPS_PRIVATE_ROUTE]: appsState.loadPrivate,
			[APPS_ROUTE]: appsState.loadShared
		},
		appsState.clearAll,
		appsState.clear
	);

	useEffect(
		() =>
			autorun(() =>
				loadApps({
					page: appsState.page,
					per_page: appsState.limit,
					table: true
				})
			),
		[loadApps]
	);

	const handleLoadMore = () => appsState.setPage(appsState.page + 1);

	const handleDelete = async uuid => appsState.delete(uuid);

	const handleEdit = uuid => async proxy => appsState.edit(uuid, proxy);

	return (
		<ItemsTable
			onLoadMore={handleLoadMore}
			hasMore={appsState.hasMore}
			headCells={appsState.headCells}
			inAction={appsState.inAction}
			isLoading={appsState.isLoading}
			isLoadingMore={appsState.isLoadingMore}
			items={appsState.apps}
			onDelete={handleDelete}
			onEdit={handleEdit}
		/>
	);
});

export default AppsTable;
