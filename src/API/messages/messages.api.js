import $api from "../../axios";

class MessagesAPI {
	static fetchByChatId(chatId) {
		return $api.get("account/get_messages", {
			params: {
				chat: chatId,
				account_token: localStorage.getItem("accountToken")
			}
		});
	}

	static send(id, message) {
		return $api.post("account/send_message", {
			receiver: id,
			message,
			account_token: localStorage.getItem("accountToken")
		});
	}
}

export default MessagesAPI;
