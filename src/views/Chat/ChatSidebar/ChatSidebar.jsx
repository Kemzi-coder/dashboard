import React, {useEffect} from "react";
import {MdSearch} from "react-icons/md";
import {observer} from "mobx-react-lite";
import BurgerButton from "../../../components/BurgerButton/BurgerButton";
import Input from "../../../components/Input/Input";
import ChatItem from "../../../components/ChatItem/ChatItem";
import chats from "../../../store/chats";

const ChatSidebar = observer(() => {
	useEffect(() => {
		chats.fetch();
	}, []);

	return (
		<div className="row-span-2 border-x border-primary-lighter">
			<div className="flex items-center mb-2 p-4">
				<BurgerButton className="mr-4 shrink-0" />
				<Input startIcon={MdSearch} placeholder="Search" />
			</div>
			{chats.isLoading ? (
				<div className="mt-2 text-center">Loading...</div>
			) : (
				<div>
					{chats.chats.map(chat => (
						<ChatItem
							title={chat.chat_title}
							lastMsgDate={chat.parsed_at}
							key={chat.id}
						/>
					))}
				</div>
			)}
		</div>
	);
});

export default ChatSidebar;
