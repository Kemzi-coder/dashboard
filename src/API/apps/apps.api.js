import $api from "../../axios";

class AppsAPI {
	static loadPrivate(params) {
		return $api.get("telegram_app/get_app_list", {params});
	}

	static loadShared(params) {
		return $api.get("telegram_app/get_shared_app_list", {params});
	}

	static delete(uuid) {
		return $api.post("telegram_app/delete_app", {app_uuid: uuid});
	}

	static edit(uuid, app) {
		return $api.post(
			"telegram_app/edit_app",
			{
				app_uuid: uuid,
				...app
			},
			{params: {table: true}}
		);
	}

	static create(app) {
		return $api.post("telegram_app/add_app", app, {params: {table: true}});
	}
}

export default AppsAPI;
