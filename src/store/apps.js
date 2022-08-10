import {makeAutoObservable} from "mobx";
import AppsAPI from "../API/apps/apps.api";
import getHasMore from "../utils/helpers/getHasMore";

class Apps {
	apps = [];

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

	setApps(apps) {
		this.apps = apps;
	}

	reset() {
		this.apps = [];
		this.page = 1;
	}

	addApps(apps) {
		this.apps = [...this.apps, ...apps];
	}

	createApp(proxy) {
		this.apps.push(proxy);
	}

	deleteApp(uuid) {
		this.apps = this.apps.filter(app => app.uuid !== uuid);
	}

	editApp(uuid, app) {
		this.apps = this.apps.map(item =>
			item.uuid === uuid ? {...item, ...app} : item
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
			const response = await AppsAPI.delete(uuid);
			console.log(response);
			this.deleteApp(uuid);
		} catch (e) {
			console.log(e);
		} finally {
			this.setInAction(false);
		}
	}

	async edit(uuid, proxy) {
		this.setInAction(true);
		try {
			const response = await AppsAPI.edit(uuid, proxy);
			console.log(response);
			this.editApp(
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
			const response = await AppsAPI.create(proxy);
			console.log(response);
			this.createApp(response.data.result.proxy);
		} catch (e) {
			console.log(e);
		}
	}

	async fetchPrivate(params) {
		this.reset();
		this.setIsLoading(true);
		try {
			const response = await AppsAPI.fetchPrivate(params);
			console.log(response);
			const {page} = response.data.result;
			const totalPageCount = response.data.result.total_page;

			this.setHasMore(getHasMore(page, totalPageCount));

			this.setApps(response.data.result.app.app);
			this.setPage(response.data.result.page);
			this.setHeadCells(response.data.result.app.table_names);
		} catch (e) {
			console.log(e);
		} finally {
			this.setIsLoading(false);
		}
	}

	async fetchMorePrivate(params) {
		this.setIsLoading(true);
		try {
			const response = await AppsAPI.fetchPrivate(params);
			console.log(response);
			const {page} = response.data.result;
			const totalPageCount = response.data.result.total_page;

			this.setHasMore(getHasMore(page, totalPageCount));

			this.addApps(response.data.result.app.app);
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
			const response = await AppsAPI.fetchShared(params);
			console.log(response);
			const {page} = response.data.result;
			const totalPageCount = response.data.result.total_page;

			this.setHasMore(getHasMore(page, totalPageCount));

			this.setApps(response.data.result.app.app);
			this.setPage(response.data.result.page);
			this.setHeadCells(response.data.result.app.table_names);
		} catch (e) {
			console.log(e);
		} finally {
			this.setIsLoading(false);
		}
	}

	async fetchMoreShared(params) {
		this.setIsLoading(true);
		try {
			const response = await AppsAPI.fetchShared(params);
			console.log(response);
			const {page} = response.data.result;
			const totalPageCount = response.data.result.total_page;

			this.setHasMore(getHasMore(page, totalPageCount));

			this.addApps(response.data.result.app.app);
			this.setPage(response.data.result.page);
		} catch (e) {
			console.log(e);
		} finally {
			this.setIsLoading(false);
		}
	}
}

export default new Apps();
