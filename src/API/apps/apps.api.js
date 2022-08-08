import $api from "../../axios";

class AppsAPI {
	static fetchPrivate(params) {
		return $api.get("telegram_app/get_app_list", {params});
	}

	static fetchShared(params) {
		return $api.get("telegram_app/get_shared_app_list", {params});
	}

	static delete(uuid) {
		return $api.post("telegram_app/delete_app", {proxy_uuid: uuid});
	}

	static edit(uuid, proxy) {
		return $api.post("telegram_app/edit_app", {
			proxy_uuid: uuid,
			table: true,
			...proxy
		});
	}

	static create(proxy) {
		return $api.post("telegram_app/add_app", {table: true, ...proxy});
	}
}

export default AppsAPI;
