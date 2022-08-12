import {makeAutoObservable} from "mobx";
import AccountsAPI from "../API/accounts/accounts.api";
import getHasMore from "../utils/helpers/getHasMore";

class Accounts {
	accounts = [];

	isLoading = false;

	headCells = [];

	page = 1;

	hasMore = false;

	inAction = false;

	limit = 2;

	constructor() {
		makeAutoObservable(this, {}, {autoBind: true});
	}

	setPage(page) {
		this.page = page;
	}

	reset() {
		this.accounts = [];
		this.page = 1;
	}

	setAccounts(accounts) {
		this.accounts = accounts;
	}

	addAccounts(accounts) {
		this.accounts = [...this.accounts, ...accounts];
	}

	setIsLoading(isLoading) {
		this.isLoading = isLoading;
	}

	setHasMore(hasMore) {
		this.hasMore = hasMore;
	}

	setHeadCells(headCells) {
		this.headCells = headCells;
	}

	setInAction(inAction) {
		this.inAction = inAction;
	}

	deleteAccount(uuid) {
		this.accounts = this.accounts.filter(account => account.uuid !== uuid);
	}

	editAccount(uuid, account) {
		this.accounts = this.accounts.map(item =>
			item.uuid === uuid ? {...item, ...account} : item
		);
	}

	async delete(uuid) {
		this.setInAction(true);
		try {
			const response = await AccountsAPI.delete(uuid);
			console.log(response);
			this.deleteAccount(uuid);
		} catch (e) {
			console.log(e);
		} finally {
			this.setInAction(false);
		}
	}

	async edit(uuid, account) {
		this.setInAction(true);
		try {
			const response = await AccountsAPI.edit(uuid, account);
			console.log(response);
			this.editAccount(
				response.data.result.account.account.uuid,
				response.data.result.account.account
			);
		} catch (e) {
			console.log(e);
		} finally {
			this.setInAction(false);
		}
	}

	async fetchAll(params) {
		this.reset();
		this.setIsLoading(true);
		try {
			const response = await AccountsAPI.fetchAll(params);
			console.log(response);
			const {page} = response.data.result;
			const totalPageCount = response.data.result.total_page;

			this.setHasMore(getHasMore(page, totalPageCount));

			this.setAccounts(response.data.result.accounts.accounts);
			this.setPage(response.data.result.page);
			this.setHeadCells(response.data.result.accounts.table_names);
		} catch (e) {
			console.log(e);
		} finally {
			this.setIsLoading(false);
		}
	}

	async fetchMore(params) {
		this.setIsLoading(true);
		try {
			const response = await AccountsAPI.fetchAll(params);
			console.log(response);
			const {page} = response.data.result;
			const totalPageCount = response.data.result.total_page;

			this.setHasMore(getHasMore(page, totalPageCount));

			this.addAccounts(response.data.result.accounts.accounts);
			this.setPage(response.data.result.page);
		} catch (e) {
			console.log(e);
		} finally {
			this.setIsLoading(false);
		}
	}
}

export default new Accounts();
