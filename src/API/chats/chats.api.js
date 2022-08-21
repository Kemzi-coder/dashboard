import $api from "../../axios";

class ChatsAPI {
	static loadAll(params) {
		return $api.get("account/get_chats", {
			params: {...params, account_token: localStorage.getItem("accountToken")}
		});
	}
}

export default ChatsAPI;
