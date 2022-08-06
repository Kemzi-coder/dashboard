import $api from "../../axios";

class ProxiesAPI {
	static fetchPrivate(params) {
		return $api.get("proxy/get_proxy_list", {params});
	}

	static fetchShared(params) {
		return $api.get("proxy/get_shared_proxy_list", {params});
	}

	static delete(uuid) {
		return $api.post("proxy/delete_proxy", {proxy_uuid: uuid});
	}

	static edit(uuid, proxy) {
		return $api.post("proxy/edit_proxy", {proxy_uuid: uuid, ...proxy});
	}

	static create(proxy) {
		return $api.post("proxy/add_proxy", proxy);
	}
}

export default ProxiesAPI;
