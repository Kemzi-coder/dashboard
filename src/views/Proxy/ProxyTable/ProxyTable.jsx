import React, {useRef, useCallback, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {observer} from "mobx-react-lite";
import Proxies from "../../../store/proxies";
import useCopyModal from "../../../hooks/useCopyModal.hook";
import {PROXY_PRIVATE_ROUTE} from "../../../utils/constants/routes";
import CopyModal from "../../../components/CopyModal/CopyModal";
import ProxyItem from "../../../components/ProxyItem/ProxyItem";
import {
	Table,
	TableHead,
	TableBody,
	TableHeadCell,
	TableRow
} from "../../../components/Table";
import InfiniteScrollList from "../../../components/InfiniteScrollList/InfiniteScrollList";

const ProxyTable = observer(() => {
	const location = useLocation();
	const {isLoading, proxies, page, hasMore, limit, inAction, headCells} =
		Proxies;

	const copyModal = useRef(null);
	const {handleClick, isCopied, setIsCopied} = useCopyModal(copyModal);

	const fetchMore = useCallback(() => {
		switch (location.pathname) {
			case PROXY_PRIVATE_ROUTE:
				Proxies.fetchMorePrivate({
					page: page + 1,
					per_page: limit,
					table: true
				});
				break;
			default:
				Proxies.fetchMoreShared({page: page + 1, per_page: limit, table: true});
		}
	}, [limit, location.pathname, page]);

	useEffect(() => {
		switch (location.pathname) {
			case PROXY_PRIVATE_ROUTE:
				Proxies.fetchPrivate({
					page: 1,
					per_page: limit,
					table: true
				});
				break;
			default:
				Proxies.fetchShared({page: 1, per_page: limit, table: true});
		}
	}, [limit, location.pathname]);

	useEffect(() => () => Proxies.setProxies([]), []);

	const handleDelete = async uuid => {
		await Proxies.delete(uuid);
	};

	const handleSave = uuid => async proxy => Proxies.edit(uuid, proxy);

	return (
		<InfiniteScrollList
			hasMore={hasMore}
			isLoading={isLoading}
			onFetchMore={fetchMore}
			length={proxies.length}
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
							<TableHeadCell ket={cell}>{cell.toLowerCase()}</TableHeadCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{proxies.map((proxy, index) => (
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

export default ProxyTable;
