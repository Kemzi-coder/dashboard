import {makeAutoObservable} from "mobx";
import StatsAPI from "../API/stats/stats.api";

class StatsState {
	stats = [];

	isLoading = false;

	constructor() {
		makeAutoObservable(this);
	}

	clear() {
		this.stats = [];
	}

	*loadAll() {
		this.isLoading = true;
		try {
			const response = yield StatsAPI.loadAll();
			console.log(response);
			const {accounts: stats} = response.data.result;
			this.stats = stats;
		} catch (e) {
			console.log(e);
		} finally {
			this.isLoading = false;
		}
	}
}

export default new StatsState();
