import React, {useEffect} from "react";
import {MdSearch} from "react-icons/md";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import BurgerButton from "../../../components/BurgerButton/BurgerButton";
import Input from "../../../components/Input/Input";
import ChatItem from "../../../components/ChatItem/ChatItem";
import chats from "../../../store/chats";

const ChatSidebar = observer(() => {
	const {id} = useParams();

	useEffect(() => {
		chats.fetch();
	}, []);

	return (
		<div className="row-span-2 border-x border-primary-lighter">
			<div className="flex items-center mb-2 p-4">
				<BurgerButton className="mr-4 shrink-0" />
				<Input startIcon={MdSearch} placeholder="Search" />
			</div>
			{!chats.isLoading && chats.chats.length === 0 && (
				<div className="mt-2 text-center">There are no chats.</div>
			)}
			{chats.isLoading ? (
				<div className="mt-2 text-center">Loading...</div>
			) : (
				<div>
					{chats.chats.map(chat => (
						<ChatItem
							isActive={id === chat.chat_id}
							chatId={chat.chat_id}
							title={chat.chat_title}
							lastMsgDate={chat.parsed_at}
							key={chat.chat_id}
						/>
					))}
				</div>
			)}
		</div>
	);
});

export default ChatSidebar;
