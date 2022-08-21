import {makeAutoObservable} from "mobx";
import AppsAPI from "../API/apps/apps.api";
import getHasMore from "../utils/helpers/getHasMore";
import checkIsFirstLoad from "../utils/helpers/checkIsFirstLoad";

class AppsState {
	apps = [];

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
		this.apps = [];
		this.headCells = [];
	}

	clearAll() {
		this.apps = [];
		this.headCells = [];
		this.hasMore = false;
		this.page = 1;
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

	*loadPrivate(params) {
		const isFirstLoad = checkIsFirstLoad(params.page);

		if (isFirstLoad) {
			this.isLoading = true;
		} else {
			this.isLoadingMore = true;
		}
		try {
			const response = yield AppsAPI.loadPrivate(params);
			console.log(response);
			const {
				page,
				total_page: totalPageCount,
				app: {app: apps, table_names: headCells}
			} = response.data.result;

			if (isFirstLoad) {
				this.apps = apps;
			} else {
				this.apps = [...this.apps, ...apps];
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
			const response = yield AppsAPI.loadShared(params);
			console.log(response);
			const {
				page,
				total_page: totalPageCount,
				app: {app: apps, table_names: headCells}
			} = response.data.result;

			if (isFirstLoad) {
				this.apps = apps;
			} else {
				this.apps = [...this.apps, ...apps];
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

export default new AppsState();
