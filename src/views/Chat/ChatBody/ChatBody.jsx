import React from "react";
import MessageItem from "../../../components/MessageItem/MessageItem";
import ChatSendForm from "../ChatSendForm/ChatSendForm";

const ChatBody = () => (
	<div className="flex flex-col justify-end p-6 border-r border-primary-lighter">
		<div className="mb-4">
			<MessageItem className="mb-3" />
			<MessageItem isMine />
		</div>
		<ChatSendForm />
	</div>
);

export default ChatBody;
