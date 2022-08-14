import {makeAutoObservable} from "mobx";
import ProxiesAPI from "../API/proxies/proxies.api";
import getHasMore from "../utils/helpers/getHasMore";

class Proxies {
	proxies = [];

	isLoading = true;

	isLoadingMore = false;

	headCells = [];

	page = 1;

	limit = 10;

	inAction = false;

	hasMore = false;

	constructor() {
		makeAutoObservable(this, {}, {autoBind: true});
	}

	setIsLoading(isLoading) {
		this.isLoading = isLoading;
	}

	*delete(uuid) {
		this.inAction = true;
		try {
			const response = yield ProxiesAPI.delete(uuid);
			console.log(response);
			const {
				proxy: {
					proxy: {uuid: resUuid}
				}
			} = response.data.result;

			this.proxies = this.proxies.filter(proxy => proxy.uuid !== resUuid);
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

	*fetchPrivate(params) {
		this.isLoading = true;
		try {
			const response = yield ProxiesAPI.fetchPrivate(params);
			console.log(response);
			const {
				page,
				total_page: totalPageCount,
				proxy: {proxy: proxies, table_names: headCells}
			} = response.data.result;

			this.hasMore = getHasMore(page, totalPageCount);
			this.proxies = proxies;
			this.page = page;
			this.headCells = headCells;
		} catch (e) {
			console.log(e);
		} finally {
			this.isLoading = false;
		}
	}

	*fetchMorePrivate(params) {
		this.isLoadingMore = true;
		try {
			const response = yield ProxiesAPI.fetchPrivate(params);
			console.log(response);
			const {
				page,
				total_page: totalPageCount,
				proxy: {proxy: proxies}
			} = response.data.result;

			this.hasMore = getHasMore(page, totalPageCount);
			this.proxies = [...this.proxies, ...proxies];
			this.page = page;
		} catch (e) {
			console.log(e);
		} finally {
			this.isLoadingMore = false;
		}
	}

	*fetchShared(params) {
		this.isLoading = true;
		try {
			const response = yield ProxiesAPI.fetchShared(params);
			console.log(response);
			const {
				page,
				total_page: totalPageCount,
				proxy: {proxy: proxies, table_names: headCells}
			} = response.data.result;

			this.hasMore = getHasMore(page, totalPageCount);
			this.proxies = proxies;
			this.page = page;
			this.headCells = headCells;
		} catch (e) {
			console.log(e);
		} finally {
			this.isLoading = false;
		}
	}

	*fetchMoreShared(params) {
		this.isLoadingMore = true;
		try {
			const response = yield ProxiesAPI.fetchShared(params);
			console.log(response);
			const {
				page,
				total_page: totalPageCount,
				proxy: {proxy: proxies}
			} = response.data.result;

			this.hasMore = getHasMore(page, totalPageCount);
			this.proxies = [...this.proxies, ...proxies];
			this.page = page;
		} catch (e) {
			console.log(e);
		} finally {
			this.isLoadingMore = false;
		}
	}
}

export default new Proxies();
