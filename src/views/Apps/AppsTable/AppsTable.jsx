import {observer} from "mobx-react-lite";
import React, {useEffect, useMemo} from "react";
import ItemsTable from "../../../components/ItemsTable/ItemsTable";
import useFetchFns from "../../../hooks/useFetchFns.hook";
import Apps from "../../../store/apps";
import {APPS_PRIVATE_ROUTE, APPS_ROUTE} from "../../../utils/constants/routes";

const AppsTable = observer(() => {
	const {isLoading, apps, page, hasMore, limit, inAction, headCells} = Apps;
	const params = useMemo(
		() => ({
			page: 1,
			per_page: limit,
			table: true
		}),
		[limit]
	);

	const [fetchApps, fetchMoreApps] = useFetchFns({
		[APPS_PRIVATE_ROUTE]: [Apps.fetchPrivate, Apps.fetchMorePrivate],
		[APPS_ROUTE]: [Apps.fetchShared, Apps.fetchMoreShared]
	});

	useEffect(() => {
		fetchApps(params);
	}, [fetchApps, params]);

	useEffect(() => () => Apps.setApps([]), []);

	const handleDelete = async uuid => {
		await Apps.delete(uuid);
	};

	const handleEdit = uuid => async proxy => Apps.edit(uuid, proxy);

	return (
		<ItemsTable
			fetchMore={() => fetchMoreApps({...params, page: page + 1})}
			hasMore={hasMore}
			headCells={headCells}
			inAction={inAction}
			isLoading={isLoading}
			items={apps}
			onDelete={handleDelete}
			onEdit={handleEdit}
		/>
	);
});

export default AppsTable;
