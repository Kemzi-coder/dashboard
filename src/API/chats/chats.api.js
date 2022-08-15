import $api from "../../axios";

class ChatsAPI {
	static fetch() {
		return $api.get("account/get_chats", {
			params: {account_token: "as_test_token_for_frontend_test"}
		});
	}
}

export default ChatsAPI;
