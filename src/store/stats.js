import {makeAutoObservable} from "mobx";
import StatsAPI from "../API/stats/stats.api";

class Stats {
	stats = {};

	isLoading = true;

	constructor() {
		makeAutoObservable(this);
	}

	setIsLoading(isLoading) {
		this.isLoading = isLoading;
	}

	*fetchAll() {
		this.isLoading = true;
		try {
			const response = yield StatsAPI.fetchAll();
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

export default new Stats();
