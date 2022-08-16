import $api from "../../axios";

class ChatsAPI {
	static fetch() {
		return $api.get("account/get_chats", {
			params: {account_token: localStorage.getItem("accountToken")}
		});
	}
}

export default ChatsAPI;
