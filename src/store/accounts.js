import {makeAutoObservable} from "mobx";
import AccountsAPI from "../API/accounts/accounts.api";
import getHasMore from "../utils/helpers/getHasMore";

class Accounts {
	accounts = [];

	isLoading = false;

	page = 1;

	hasMore = false;

	limit = 2;

	constructor() {
		makeAutoObservable(this);
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

	async fetchAll(params) {
		this.reset();
		this.setIsLoading(true);
		try {
			const response = await AccountsAPI.fetchAll(params);
			console.log(response);
			const {page} = response.data.result;
			const totalPageCount = response.data.result.total_page;

			this.setHasMore(getHasMore(page, totalPageCount));

			this.setAccounts(response.data.result.accounts);
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
			const {page} = response.data.result;
			const totalPageCount = response.data.result.total_page;

			this.setHasMore(getHasMore(page, totalPageCount));

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
