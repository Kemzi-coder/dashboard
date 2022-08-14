import {makeAutoObservable} from "mobx";
import AppsAPI from "../API/apps/apps.api";
import getHasMore from "../utils/helpers/getHasMore";

class Apps {
	apps = [];

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
			const response = yield AppsAPI.delete(uuid);
			console.log(response);
			const {
				app: {
					app: {uuid: newUuid}
				}
			} = response.data.result;

			this.apps = this.apps.filter(app => app.uuid !== newUuid);
		} catch (e) {
			console.log(e);
		} finally {
			this.inAction = false;
		}
	}

	*edit(uuid, app) {
		this.inAction = true;
		try {
			const response = yield AppsAPI.edit(uuid, app);
			console.log(response);
			const {
				app: {
					app: newApp,
					app: {uuid: newUuid}
				}
			} = response.result;

			this.apps = this.apps.map(item =>
				item.uuid === newUuid ? {...item, ...newApp} : item
			);
		} catch (e) {
			console.log(e);
		} finally {
			this.inAction = false;
		}
	}

	*create(app) {
		try {
			const response = yield AppsAPI.create(app);
			console.log(response);
			const {
				app: {app: newApp}
			} = response.data.result;

			this.apps.push(newApp);
		} catch (e) {
			console.log(e);
		}
	}

	*fetchPrivate(params) {
		this.isLoading = true;
		try {
			const response = yield AppsAPI.fetchPrivate(params);
			const {
				page,
				total_page: totalPageCount,
				app: {app: apps, table_names: headCells}
			} = response.data.result;

			this.hasMore = getHasMore(page, totalPageCount);
			this.apps = apps;
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
			const response = yield AppsAPI.fetchPrivate(params);
			console.log(response);
			const {
				page,
				total_page: totalPageCount,
				app: {app: apps}
			} = response.data.result;

			this.hasMore = getHasMore(page, totalPageCount);
			this.apps = [...this.apps, ...apps];
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
			const response = yield AppsAPI.fetchShared(params);
			console.log(response);
			const {
				page,
				total_page: totalPageCount,
				app: {app: apps, table_names: headCells}
			} = response.data.result;

			this.hasMore = getHasMore(page, totalPageCount);
			this.apps = apps;
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
			const response = yield AppsAPI.fetchShared(params);
			console.log(response);
			const {
				page,
				total_page: totalPageCount,
				app: {app: apps}
			} = response.data.result;

			this.hasMore = getHasMore(page, totalPageCount);
			this.apps = [...this.apps, ...apps];
			this.page = page;
		} catch (e) {
			console.log(e);
		} finally {
			this.isLoadingMore = false;
		}
	}
}

export default new Apps();
