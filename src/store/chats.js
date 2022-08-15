import {makeAutoObservable} from "mobx";
import ChatsAPI from "../API/chats/chats.api";
import getHasMore from "../utils/helpers/getHasMore";

class Chats {
	isLoading = true;

	chats = [];

	page = 1;

	hasMore = false;

	limit = 10;

	constructor() {
		makeAutoObservable(this);
	}

	*fetch() {
		this.isLoading = true;
		try {
			const response = yield ChatsAPI.fetch();
			console.log(response);
			const {chats, total_page: totalPageCount, page} = response.data.result;

			this.hasMore = getHasMore(page, totalPageCount);
			this.page = page;
			this.chats = chats;
		} catch (e) {
			console.log(e);
		} finally {
			this.isLoading = false;
		}
	}
}

export default new Chats();
