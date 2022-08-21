import {makeAutoObservable} from "mobx";
import ChatsAPI from "../API/chats/chats.api";
import getHasMore from "../utils/helpers/getHasMore";
import checkIsFirstLoad from "../utils/helpers/checkIsFirstLoad";

class ChatsState {
	isLoading = false;

	isLoadingMore = false;

	chats = [];

	page = 1;

	hasMore = false;

	limit = 10;

	constructor() {
		makeAutoObservable(this);
	}

	setPage(page) {
		this.page = page;
	}

	clear() {
		this.chats = [];
		this.hasMore = false;
		this.page = 1;
	}

	*loadAll(params) {
		const isFirstLoad = checkIsFirstLoad(params.page);

		if (isFirstLoad) {
			this.isLoading = true;
		} else {
			this.isLoadingMore = true;
		}
		try {
			const response = yield ChatsAPI.loadAll(params);
			console.log(response);
			const {chats, total_page: totalPageCount, page} = response.data.result;

			if (isFirstLoad) {
				this.chats = chats;
			} else {
				this.chats = [...this.chats, ...chats];
			}

			this.hasMore = getHasMore(page, totalPageCount);
		} catch (e) {
			console.log(e);
		} finally {
			if (isFirstLoad) {
				this.isLoading = false;
			} else {
				this.isLoadingMore = false;
			}
		}
	}
}

export default new ChatsState();
