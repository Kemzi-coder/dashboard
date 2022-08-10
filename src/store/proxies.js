import {makeAutoObservable} from "mobx";
import ProxiesAPI from "../API/proxies/proxies.api";
import getHasMore from "../utils/helpers/getHasMore";

class Proxies {
	proxies = [];

	isLoading = false;

	headCells = [];

	page = 1;

	limit = 2;

	inAction = false;

	hasMore = false;

	constructor() {
		makeAutoObservable(this, {}, {autoBind: true});
	}

	setPage(page) {
		this.page = page;
	}

	setProxies(proxies) {
		this.proxies = proxies;
	}

	reset() {
		this.proxies = [];
		this.page = 1;
	}

	addProxies(proxies) {
		this.proxies = [...this.proxies, ...proxies];
	}

	createProxy(proxy) {
		this.proxies.push(proxy);
	}

	deleteProxy(uuid) {
		this.proxies = this.proxies.filter(proxy => proxy.uuid !== uuid);
	}

	editProxy(uuid, proxy) {
		this.proxies = this.proxies.map(item =>
			item.uuid === uuid ? {...item, ...proxy} : item
		);
	}

	setIsLoading(isLoading) {
		this.isLoading = isLoading;
	}

	setInAction(inAction) {
		this.inAction = inAction;
	}

	setHasMore(hasMore) {
		this.hasMore = hasMore;
	}

	setHeadCells(headCells) {
		this.headCells = headCells;
	}

	async delete(uuid) {
		this.setInAction(true);
		try {
			const response = await ProxiesAPI.delete(uuid);
			console.log(response);
			this.deleteProxy(uuid);
		} catch (e) {
			console.log(e);
		} finally {
			this.setInAction(false);
		}
	}

	async edit(uuid, proxy) {
		this.setInAction(true);
		try {
			const response = await ProxiesAPI.edit(uuid, proxy);
			console.log(response);
			this.editProxy(
				response.data.result.proxy?.uuid,
				response.data.result.proxy
			);
		} catch (e) {
			console.log(e);
		} finally {
			this.setInAction(false);
		}
	}

	async create(proxy) {
		try {
			const response = await ProxiesAPI.create(proxy);
			console.log(response);
			this.createProxy(response.data.result.proxy);
		} catch (e) {
			console.log(e);
		}
	}

	async fetchPrivate(params) {
		this.reset();
		this.setIsLoading(true);
		try {
			const response = await ProxiesAPI.fetchPrivate(params);
			console.log(response);
			const {page} = response.data.result;
			const totalPageCount = response.data.result.total_page;

			this.setHasMore(getHasMore(page, totalPageCount));

			this.setProxies(response.data.result.proxy.proxy);
			this.setPage(response.data.result.page);
			this.setHeadCells(response.data.result.proxy.table_names);
		} catch (e) {
			console.log(e);
		} finally {
			this.setIsLoading(false);
		}
	}

	async fetchMorePrivate(params) {
		this.setIsLoading(true);
		try {
			const response = await ProxiesAPI.fetchPrivate(params);
			console.log(response);
			const {page} = response.data.result;
			const totalPageCount = response.data.result.total_page;

			this.setHasMore(getHasMore(page, totalPageCount));

			this.addProxies(response.data.result.proxy.proxy);
			this.setPage(response.data.result.page);
		} catch (e) {
			console.log(e);
		} finally {
			this.setIsLoading(false);
		}
	}

	async fetchShared(params) {
		this.reset();
		this.setIsLoading(true);
		try {
			const response = await ProxiesAPI.fetchShared(params);
			console.log(response);
			const {page} = response.data.result;
			const totalPageCount = response.data.result.total_page;

			this.setHasMore(getHasMore(page, totalPageCount));

			this.setProxies(response.data.result.proxy.proxy);
			this.setPage(response.data.result.page);
			this.setHeadCells(response.data.result.proxy.table_names);
		} catch (e) {
			console.log(e);
		} finally {
			this.setIsLoading(false);
		}
	}

	async fetchMoreShared(params) {
		this.setIsLoading(true);
		try {
			const response = await ProxiesAPI.fetchShared(params);
			console.log(response);
			const {page} = response.data.result;
			const totalPageCount = response.data.result.total_page;

			this.setHasMore(getHasMore(page, totalPageCount));

			this.addProxies(response.data.result.proxy.proxy);
			this.setPage(response.data.result.page);
		} catch (e) {
			console.log(e);
		} finally {
			this.setIsLoading(false);
		}
	}
}

export default new Proxies();
