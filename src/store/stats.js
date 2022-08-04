import {makeAutoObservable} from "mobx";
import StatsAPI from "../API/stats/stats.api";

class Stats {
	stats = {};

	isLoading = false;

	constructor() {
		makeAutoObservable(this);
	}

	setStats(stats) {
		this.stats = stats;
	}

	setIsLoading(isLoading) {
		this.isLoading = isLoading;
	}

	async fetchAll() {
		this.setIsLoading(true);
		try {
			const response = await StatsAPI.fetchAll();
			console.log(response);
			this.setStats(response.data.result.accounts);
		} catch (e) {
			console.log(e);
		} finally {
			this.setIsLoading(false);
		}
	}
}

export default new Stats();
