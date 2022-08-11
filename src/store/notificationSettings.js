import {makeAutoObservable} from "mobx";
import NotificationSettingsAPI from "../API/notificationSettings/notificationSettings.api";

class NotificationSettings {
	settings = [];

	isLoading = true;

	constructor() {
		makeAutoObservable(this);
	}

	setSettings(settings) {
		this.settings = settings;
	}

	setIsLoading(isLoading) {
		this.isLoading = isLoading;
	}

	async fetch() {
		this.setIsLoading(true);
		try {
			const response = await NotificationSettingsAPI.fetch();
			console.log(response);
			this.setSettings(response.data.result.contact);
		} catch (e) {
			console.log(e);
		} finally {
			this.setIsLoading(false);
		}
	}

	// eslint-disable-next-line class-methods-use-this
	async edit(settings) {
		try {
			const response = await NotificationSettingsAPI.edit(settings);
			console.log(response);
			this.setSettings(response.data.result.contact);
		} catch (e) {
			console.log(e);
		}
	}
}

export default new NotificationSettings();
