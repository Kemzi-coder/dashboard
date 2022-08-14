import {makeAutoObservable} from "mobx";
import NotificationSettingsAPI from "../API/notificationSettings/notificationSettings.api";

class NotificationSettings {
	settings = [];

	isLoading = true;

	constructor() {
		makeAutoObservable(this);
	}

	setIsLoading(isLoading) {
		this.isLoading = isLoading;
	}

	*fetch() {
		this.isLoading = true;
		try {
			const response = yield NotificationSettingsAPI.fetch();
			console.log(response);
			const {contact: settings} = response.data.result;

			this.settings = settings;
		} catch (e) {
			console.log(e);
		} finally {
			this.isLoading = false;
		}
	}

	*edit(settings) {
		try {
			const response = yield NotificationSettingsAPI.edit(settings);
			console.log(response);
			const {contact: resSettings} = response.data.result;

			this.settings = resSettings;
		} catch (e) {
			console.log(e);
		}
	}
}

export default new NotificationSettings();
