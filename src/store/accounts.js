import {makeAutoObservable} from "mobx";
import AccountsAPI from "../API/accounts/accounts.api";

class Accounts {
	accounts = [];

	isLoading = false;

	page = 1;

	totalPageCount = 1;

	limit = 2;

	constructor() {
		makeAutoObservable(this);
	}

	setPage(page) {
		this.page = page;
	}

	setTotalPageCount(totalPageCount) {
		this.totalPageCount = totalPageCount;
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

	async fetchAll(params) {
		this.reset();
		this.setIsLoading(true);
		try {
			const response = await AccountsAPI.fetchAll(params);
			console.log(response);
			this.setAccounts(response.data.result.accounts);
			this.setTotalPageCount(response.data.result.total_page);
			this.setPage(response.data.result.page);
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
			this.addAccounts(response.data.result.accounts);
			this.setPage(response.data.result.page);
		} catch (e) {
			console.log(e);
		} finally {
			this.setIsLoading(false);
		}
	}
}

export default new Accounts();
