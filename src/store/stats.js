import {makeAutoObservable} from "mobx";

class Stats {
	stats = []

	constructor() {
		makeAutoObservable(this);
	}

	setStats(stats) {
		this.stats = stats;
	}
}