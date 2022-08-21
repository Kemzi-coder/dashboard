import {makeAutoObservable} from "mobx";
import ProxiesAPI from "../API/proxies/proxies.api";
import getHasMore from "../utils/helpers/getHasMore";
import checkIsFirstLoad from "../utils/helpers/checkIsFirstLoad";

class ProxiesState {
	proxies = [];

	isLoading = false;

	isLoadingMore = false;

	headCells = [];

	page = 1;

	limit = 5;

	inAction = false;

	hasMore = false;

	constructor() {
		makeAutoObservable(this, {}, {autoBind: true});
	}

	setPage(page) {
		this.page = page;
	}

	clear() {
		this.proxies = [];
		this.headCells = [];
	}

	clearAll() {
		this.proxies = [];
		this.headCells = [];
		this.hasMore = false;
		this.page = 1;
	}

	*delete(uuid) {
		this.inAction = true;
		try {
			const response = yield ProxiesAPI.delete(uuid);
			console.log(response);

			this.proxies = this.proxies.filter(proxy => proxy.uuid !== uuid);
		} catch (e) {
			console.log(e);
		} finally {
			this.inAction = false;
		}
	}

	*edit(uuid, proxy) {
		this.inAction = true;
		try {
			const response = yield ProxiesAPI.edit(uuid, proxy);
			console.log(response);
			const {
				proxy: {
					proxy: resProxy,
					proxy: {uuid: resUuid}
				}
			} = response.data.result;

			this.proxies = this.proxies.map(item =>
				item.uuid === resUuid ? {...item, ...resProxy} : item
			);
		} catch (e) {
			console.log(e);
		} finally {
			this.inAction = false;
		}
	}

	*create(proxy) {
		try {
			const response = yield ProxiesAPI.create(proxy);
			console.log(response);
			const {
				proxy: {proxy: resProxy}
			} = response.data.result;

			this.proxies.push(resProxy);
		} catch (e) {
			console.log(e);
		}
	}

	*check(uuid) {
		this.inAction = true;
		try {
			const response = yield ProxiesAPI.check(uuid);
			console.log(response);
			const {
				proxy: resProxy,
				proxy: {uuid: resUuid}
			} = response.data.result;

			this.proxies = this.proxies.map(item =>
				item.uuid === resUuid ? {...item, ...resProxy} : item
			);
		} catch (e) {
			console.log(e);
		} finally {
			this.inAction = false;
		}
	}

	*loadPrivate(params) {
		const isFirstLoad = checkIsFirstLoad(params.page);

		if (isFirstLoad) {
			this.isLoading = true;
		} else {
			this.isLoadingMore = true;
		}
		try {
			const response = yield ProxiesAPI.loadPrivate(params);
			console.log(response);
			const {
				page,
				total_page: totalPageCount,
				proxy: {proxy: proxies, table_names: headCells}
			} = response.data.result;

			if (isFirstLoad) {
				this.proxies = proxies;
			} else {
				this.proxies = [...this.proxies, ...proxies];
			}

			this.hasMore = getHasMore(page, totalPageCount);
			this.headCells = headCells;
		} catch (e) {
			console.log(e);
		} finally {
			if (isFirstLoad) {
				this.isLoading = false;
			} else {
				this.isLoadingMore = false;
			}
		}
	}

	*loadShared(params) {
		const isFirstLoad = checkIsFirstLoad(params.page);

		if (isFirstLoad) {
			this.isLoading = true;
		} else {
			this.isLoadingMore = true;
		}
		try {
			const response = yield ProxiesAPI.loadShared(params);
			console.log(response);
			const {
				page,
				total_page: totalPageCount,
				proxy: {proxy: proxies, table_names: headCells}
			} = response.data.result;

			if (isFirstLoad) {
				this.proxies = proxies;
			} else {
				this.proxies = [...this.proxies, ...proxies];
			}

			this.hasMore = getHasMore(page, totalPageCount);
			this.headCells = headCells;
		} catch (e) {
			console.log(e);
		} finally {
			if (isFirstLoad) {
				this.isLoading = false;
			} else {
				this.isLoadingMore = false;
			}
		}
	}
}

export default new ProxiesState();
