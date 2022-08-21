import {makeAutoObservable} from "mobx";
import AccountsAPI from "../API/accounts/accounts.api";
import getHasMore from "../utils/helpers/getHasMore";
import checkIsFirstLoad from "../utils/helpers/checkIsFirstLoad";

class AccountsState {
	accounts = [];

	isLoading = false;

	isLoadingMore = false;

	headCells = [];

	page = 1;

	hasMore = false;

	inAction = false;

	limit = 5;

	constructor() {
		makeAutoObservable(this, {}, {autoBind: true});
	}

	setPage(page) {
		this.page = page;
	}

	clear() {
		this.accounts = [];
		this.headCells = [];
	}

	clearAll() {
		this.accounts = [];
		this.headCells = [];
		this.hasMore = false;
		this.page = 1;
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

	*loadAll(params) {
		const isFirstLoad = checkIsFirstLoad(params.page);

		if (isFirstLoad) {
			this.isLoading = true;
		} else {
			this.isLoadingMore = true;
		}
		try {
			const response = yield AccountsAPI.loadAll(params);
			console.log(response);
			const {
				page,
				total_page: totalPageCount,
				accounts: {accounts, table_names: headCells}
			} = response.data.result;

			if (isFirstLoad) {
				this.accounts = accounts;
			} else {
				this.accounts = [...this.accounts, ...accounts];
			}

			this.hasMore = getHasMore(page, totalPageCount);

			if (isFirstLoad) {
				this.headCells = headCells;
			}
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

	*loadAccountToken(uuid, redirect) {
		this.inAction = true;
		try {
			const response = yield AccountsAPI.loadAccountToken(uuid);
			console.log(response);
			const {account_token: accountToken} = response.data.result;

			localStorage.setItem("accountToken", accountToken);
			redirect();
		} catch (e) {
			console.log(e);
		} finally {
			this.inAction = false;
		}
	}
}

export default new AccountsState();
