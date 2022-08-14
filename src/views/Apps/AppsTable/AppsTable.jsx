import {observer} from "mobx-react-lite";
import React, {useCallback, useEffect, useMemo} from "react";
import ItemsTable from "../../../components/ItemsTable/ItemsTable";
import useFetchFns from "../../../hooks/useFetchFns.hook";
import apps from "../../../store/apps";
import {APPS_PRIVATE_ROUTE, APPS_ROUTE} from "../../../utils/constants/routes";

const AppsTable = observer(() => {
	const params = useMemo(
		() => ({
			page: 1,
			per_page: apps.limit,
			table: true
		}),
		[]
	);

	const [fetchApps, fetchMoreApps] = useFetchFns({
		[APPS_PRIVATE_ROUTE]: [apps.fetchPrivate, apps.fetchMorePrivate],
		[APPS_ROUTE]: [apps.fetchShared, apps.fetchMoreShared]
	});

	useEffect(() => {
		fetchApps(params);
	}, [fetchApps, params]);

	useEffect(() => () => apps.setIsLoading(true), []);

	const fetchMore = useCallback(
		() => fetchMoreApps({...params, page: apps.page + 1}),
		[fetchMoreApps, params]
	);

	const handleDelete = async uuid => apps.delete(uuid);

	const handleEdit = uuid => async proxy => apps.edit(uuid, proxy);

	return (
		<ItemsTable
			fetchMore={fetchMore}
			hasMore={apps.hasMore}
			headCells={apps.headCells}
			inAction={apps.inAction}
			isLoading={apps.isLoading}
			isLoadingMore={apps.isLoadingMore}
			items={apps.apps}
			onDelete={handleDelete}
			onEdit={handleEdit}
		/>
	);
});

export default AppsTable;
