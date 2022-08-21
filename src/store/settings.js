import {makeAutoObservable} from "mobx";
import SettingsApi from "../API/settings/settings.api";

class SettingsState {
	settings = [];

	isLoading = false;

	constructor() {
		makeAutoObservable(this);
	}

	clear() {
		this.settings = [];
	}

	*loadNotification() {
		this.isLoading = true;
		try {
			const response = yield SettingsApi.loadNotification();
			console.log(response);
			const {contact: settings} = response.data.result;

			this.settings = settings;
		} catch (e) {
			console.log(e);
		} finally {
			this.isLoading = false;
		}
	}

	*editNotification(settings) {
		try {
			const response = yield SettingsApi.editNotification(settings);
			console.log(response);
			const {contact: resSettings} = response.data.result;

			this.settings = resSettings;
		} catch (e) {
			console.log(e);
		}
	}
}

export default new SettingsState();
