import React, {useRef, useCallback, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {observer} from "mobx-react-lite";
import Proxies from "../../../store/proxies";
import useCopyModal from "../../../hooks/useCopyModal.hook";
import useObserver from "../../../hooks/useObserver.hook";
import {PROXY_PRIVATE_ROUTE} from "../../../utils/constants/routes";
import CopyModal from "../../../components/CopyModal/CopyModal";
import ProxyItem from "../../../components/ProxyItem/ProxyItem";

const ProxyTable = observer(() => {
	const location = useLocation();
	const lastElement = useRef(null);
	const {isLoading, proxies, page, totalPageCount, limit} = Proxies;

	const copyModal = useRef(null);
	const {handleClick, isCopied, setIsCopied} = useCopyModal(copyModal);

	const hasMore = page < totalPageCount;

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
			<table className="table-fixed w-full">
				<thead className="border-b-2 border-transparent">
					<tr className="text-left [&_th]:font-normal [&_th]:py-3 [&_th]:px-3 border rounded-2xl border-primaryLighter">
						<th className="w-1/12">No.</th>
						<th>Status</th>
						<th>Type</th>
						<th>Host</th>
						<th>Checked</th>
						<th>UUID</th>
						{proxies.every(proxy => proxy.shared === false) && <th>Actions</th>}
					</tr>
				</thead>
				<tbody>
					{proxies.map((proxy, index) => (
						<ProxyItem
							onSave={handleSave(proxy.uuid)}
							isPrivate={!proxy.shared}
							onDelete={() => handleDelete(proxy.uuid)}
							number={index + 1}
							onClick={handleClick}
							key={proxy.id}
							host={proxy.host}
							status={proxy.status}
							checkedAt={proxy.checked_at}
							uuid={proxy.uuid}
							type={proxy.proxy_type}
						/>
					))}
				</tbody>
			</table>
			<div ref={lastElement} />
			{isLoading && "Loading..."}
		</>
	);
});

export default ProxyTable;
