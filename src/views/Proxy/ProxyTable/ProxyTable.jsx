import React, {useRef, useCallback, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {observer} from "mobx-react-lite";
import Proxies from "../../../store/proxies";
import useCopyModal from "../../../hooks/useCopyModal.hook";
import useObserver from "../../../hooks/useObserver.hook";
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

const ProxyTable = observer(() => {
	const location = useLocation();
	const lastElement = useRef(null);
	const {isLoading, proxies, page, hasMore, limit, inAction} = Proxies;

	const copyModal = useRef(null);
	const {handleClick, isCopied, setIsCopied} = useCopyModal(copyModal);

	const fetchMore = useCallback(() => {
		switch (location.pathname) {
			case PROXY_PRIVATE_ROUTE:
				Proxies.fetchMorePrivate({
					page: page + 1,
					per_page: limit
				});
				break;
			default:
				Proxies.fetchMoreShared({page: page + 1, per_page: limit});
		}
	}, [limit, location.pathname, page]);

	useEffect(() => {
		switch (location.pathname) {
			case PROXY_PRIVATE_ROUTE:
				Proxies.fetchPrivate({page: 1, per_page: limit, status: "good"});
				break;
			default:
				Proxies.fetchShared({page: 1, per_page: limit});
		}
	}, [limit, location.pathname]);

	useEffect(() => () => Proxies.setProxies([]), []);

	useObserver(lastElement, hasMore, isLoading, fetchMore);

	const handleDelete = async uuid => {
		await Proxies.delete(uuid);
	};

	const handleSave = uuid => async proxy => Proxies.edit(uuid, proxy);

	return (
		<>
			<CopyModal
				ref={copyModal}
				isCopied={isCopied}
				setIsCopied={setIsCopied}
			/>
			<Table>
				<TableHead>
					<TableRow>
						<TableHeadCell className="w-1/12">No.</TableHeadCell>
						<TableHeadCell>Status</TableHeadCell>
						<TableHeadCell>Type</TableHeadCell>
						<TableHeadCell>Host</TableHeadCell>
						<TableHeadCell>Checked</TableHeadCell>
						<TableHeadCell>UUID</TableHeadCell>
						{proxies.some(proxy => proxy.allow_edit === true) && (
							<TableHeadCell>Actions</TableHeadCell>
						)}
					</TableRow>
				</TableHead>
				<TableBody>
					{proxies.map((proxy, index) => (
						<ProxyItem
							onSave={handleSave(proxy.uuid)}
							isActionsAllowed={proxy.allow_edit}
							onDelete={() => handleDelete(proxy.uuid)}
							number={index + 1}
							onClick={handleClick}
							key={proxy.id}
							host={proxy.host}
							status={proxy.status}
							checkedAt={proxy.checked_at}
							uuid={proxy.uuid}
							type={proxy.proxy_type}
							isLoading={inAction}
						/>
					))}
				</TableBody>
			</Table>
			{proxies.length === 0 && !isLoading && "Table is empty."}
			{isLoading && "Loading..."}
			<div ref={lastElement} />
		</>
	);
});

export default ProxyTable;
