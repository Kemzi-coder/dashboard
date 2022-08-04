import {makeAutoObservable} from "mobx";
import AccountsAPI from "../API/accounts/accounts.api";

class Accounts {
	accounts = [];

	isLoading = false;

	constructor() {
		makeAutoObservable(this);
	}

	setAccounts(accounts) {
		this.accounts = accounts;
	}

	setIsLoading(isLoading) {
		this.isLoading = isLoading;
	}

	async fetchAll(params) {
		this.setIsLoading(true);
		try {
			const response = await AccountsAPI.fetchAll(params);
			console.log(response);
			this.setAccounts(response.data.result.accounts);
		} catch (e) {
			console.log(e);
		} finally {
			this.setIsLoading(false);
		}
	}
}

export default new Accounts();
