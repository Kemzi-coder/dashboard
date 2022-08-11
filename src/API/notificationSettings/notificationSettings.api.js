import $api from "../../axios";

class NotificationSettingsAPI {
	static fetch() {
		return $api.get("service/get_notify_settings");
	}

	static edit(settings) {
		return $api.post("service/edit_notify_settings", settings);
	}
}

export default NotificationSettingsAPI;
