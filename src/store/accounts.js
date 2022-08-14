import {makeAutoObservable} from "mobx";
import AccountsAPI from "../API/accounts/accounts.api";
import getHasMore from "../utils/helpers/getHasMore";

class Accounts {
	accounts = [];

	isLoading = true;

	isLoadingMore = false;

	headCells = [];

	page = 1;

	hasMore = false;

	inAction = false;

	limit = 10;

	constructor() {
		makeAutoObservable(this, {}, {autoBind: true});
	}

	setIsLoading(isLoading) {
		this.isLoading = isLoading;
	}

	*delete(uuid) {
		this.inAction = true;
		try {
			const response = yield AccountsAPI.delete(uuid);
			console.log(response);
			this.accounts = this.accounts.filter(account => account.uuid !== uuid);
		} catch (e) {
			console.log(e);
		} finally {
			this.inAction = false;
		}
	}

	*edit(uuid, account) {
		this.inAction = true;
		try {
			const response = yield AccountsAPI.edit(uuid, account);
			console.log(response);
			const {
				account: {
					account: resAccount,
					account: {uuid: resUuid}
				}
			} = response.data.result;

			this.accounts = this.accounts.map(item =>
				item.uuid === resUuid ? {...item, ...resAccount} : item
			);
		} catch (e) {
			console.log(e);
		} finally {
			this.inAction = false;
		}
	}

	*fetchAll(params) {
		this.isLoading = true;
		try {
			const response = yield AccountsAPI.fetchAll(params);
			console.log(response);
			const {
				page,
				total_page: totalPageCount,
				accounts: {accounts, table_names: headCells}
			} = response.data.result;

			this.hasMore = getHasMore(page, totalPageCount);
			this.accounts = accounts;
			this.page = page;
			this.headCells = headCells;
		} catch (e) {
			console.log(e);
		} finally {
			this.isLoading = false;
		}
	}

	*fetchMore(params) {
		this.isLoadingMore = true;
		try {
			const response = yield AccountsAPI.fetchAll(params);
			console.log(response);
			const {
				page,
				total_page: totalPageCount,
				accounts: {accounts}
			} = response.data.result;

			this.hasMore = getHasMore(page, totalPageCount);
			this.accounts = [...this.accounts, ...accounts];
			this.page = page;
		} catch (e) {
			console.log(e);
		} finally {
			this.isLoadingMore = false;
		}
	}
}

export default new Accounts();
