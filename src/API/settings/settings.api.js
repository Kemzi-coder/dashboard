import $api from "../../axios";

class SettingsApi {
	static loadNotification() {
		return $api.get("service/get_notify_settings");
	}

	static editNotification(settings) {
		return $api.post("service/edit_notify_settings", settings);
	}
}

export default SettingsApi;
