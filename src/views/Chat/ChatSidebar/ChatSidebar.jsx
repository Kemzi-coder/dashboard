import React, {useEffect} from "react";
import {MdSearch} from "react-icons/md";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {autorun} from "mobx";
import BurgerButton from "../../../components/BurgerButton/BurgerButton";
import Input from "../../../components/Input/Input";
import ChatItem from "../../../components/ChatItem/ChatItem";
import chatsState from "../../../store/chats";
import InfiniteScrollList from "../../../components/InfiniteScrollList/InfiniteScrollList";

const ChatSidebar = observer(() => {
	const {id} = useParams();

	useEffect(
		() =>
			autorun(() =>
				chatsState.loadAll({page: chatsState.page, per_page: chatsState.limit})
			),
		[]
	);

	const handleLoadMore = () => chatsState.setPage(chatsState.page + 1);

	return (
		<div className="row-span-2 border-x border-primary-lighter">
			<div className="flex items-center mb-2 p-4">
				<BurgerButton className="mr-4 shrink-0" />
				<Input startIcon={MdSearch} placeholder="Search" />
			</div>
			<div className="mt-2 text-center">
				{!chatsState.isLoading &&
					chatsState.chats.length === 0 &&
					"There are no chats."}
				{chatsState.isLoading ? (
					"Loading..."
				) : (
					<InfiniteScrollList
						isLoadingMore={chatsState.isLoadingMore}
						hasMore={chatsState.hasMore}
						isLoading={chatsState.isLoading}
						length={chatsState.chats.length}
						onLoadMore={handleLoadMore}
					>
						{chatsState.chats.map(chat => (
							<ChatItem
								isActive={id === chat.chat_id}
								chatId={chat.chat_id}
								title={chat.chat_title}
								lastMsgDate={chat.parsed_at}
								key={chat.chat_id}
							/>
						))}
					</InfiniteScrollList>
				)}
			</div>
		</div>
	);
});

export default ChatSidebar;
