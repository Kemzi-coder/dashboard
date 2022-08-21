import {makeAutoObservable} from "mobx";
import MessagesAPI from "../API/messages/messages.api";

class Messages {
	messages = [];

	isLoading = false;

	constructor() {
		makeAutoObservable(this);
	}

	clear() {
		this.messages = [];
	}

	*loadByChatId(chatId) {
		this.isLoading = true;
		try {
			const response = yield MessagesAPI.loadByChatId(chatId);
			console.log(response);
			const {messages} = response.data.result;

			this.messages = messages;
		} catch (e) {
			console.log(e);
		} finally {
			this.isLoading = false;
		}
	}

	// eslint-disable-next-line class-methods-use-this
	*send(id, message) {
		try {
			const response = yield MessagesAPI.send(id, message);
			console.log(response);
		} catch (e) {
			console.log(e);
		}
	}
}

export default new Messages();
