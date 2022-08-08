import {observer} from "mobx-react-lite";
import React, {useCallback, useEffect, useRef} from "react";
import {useLocation} from "react-router-dom";
import CopyModal from "../../../components/CopyModal/CopyModal";
import InfiniteScrollList from "../../../components/InfiniteScrollList/InfiniteScrollList";
import ProxyItem from "../../../components/ProxyItem/ProxyItem";
import {
	Table,
	TableBody,
	TableHead,
	TableHeadCell,
	TableRow
} from "../../../components/Table";
import useCopyModal from "../../../hooks/useCopyModal.hook";
import Apps from "../../../store/apps";
import {APPS_PRIVATE_ROUTE} from "../../../utils/constants/routes";

const AppsTable = observer(() => {
	const location = useLocation();
	const {isLoading, apps, page, hasMore, limit, inAction, headCells} = Apps;

	const copyModal = useRef(null);
	const {handleClick, isCopied, setIsCopied} = useCopyModal(copyModal);

	const fetchMore = useCallback(() => {
		switch (location.pathname) {
			case APPS_PRIVATE_ROUTE:
				Apps.fetchMorePrivate({
					page: page + 1,
					per_page: limit,
					table: true
				});
				break;
			default:
				Apps.fetchMoreShared({
					page: page + 1,
					per_page: limit,
					table: true
				});
		}
	}, [limit, location.pathname, page]);

	useEffect(() => {
		switch (location.pathname) {
			case APPS_PRIVATE_ROUTE:
				Apps.fetchPrivate({
					page: 1,
					per_page: limit,
					table: true
				});
				break;
			default:
				Apps.fetchShared({page: 1, per_page: limit, table: true});
		}
	}, [limit, location.pathname]);

	useEffect(() => () => Apps.setApps([]), []);

	const handleDelete = async uuid => {
		await Apps.delete(uuid);
	};

	const handleSave = uuid => async proxy => Apps.edit(uuid, proxy);

	return (
		<InfiniteScrollList
			hasMore={hasMore}
			isLoading={isLoading}
			length={apps.length}
			onFetchMore={fetchMore}
		>
			<CopyModal
				ref={copyModal}
				isCopied={isCopied}
				setIsCopied={setIsCopied}
			/>
			<Table>
				<TableHead>
					<TableRow>
						<TableHeadCell>No.</TableHeadCell>
						<TableHeadCell>Actions</TableHeadCell>
						{headCells.map(cell => (
							<TableHeadCell key={cell}>{cell.toLowerCase()}</TableHeadCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{apps.map((proxy, index) => (
						<ProxyItem
							key={proxy.uuid}
							onSave={handleSave(proxy.uuid)}
							isActionsAllowed={proxy.edit_allowed}
							onDelete={() => handleDelete(proxy.uuid)}
							number={index + 1}
							onClick={handleClick}
							isLoading={inAction}
							values={proxy.values}
						/>
					))}
				</TableBody>
			</Table>
		</InfiniteScrollList>
	);
});

export default AppsTable;
