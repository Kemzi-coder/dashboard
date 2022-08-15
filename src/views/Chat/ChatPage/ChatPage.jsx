import React from "react";
import ChatSidebar from "../ChatSidebar/ChatSidebar";
import ChatHeader from "../ChatHeader/ChatHeader";
import ChatBody from "../ChatBody/ChatBody";

const ChatPage = () => (
	<div className="max-w-[1472px] mx-auto px-4">
		<div className="grid grid-cols-[350px_1fr] grid-rows-[80px_1fr] min-h-screen text-text-light">
			<ChatSidebar />
			<ChatHeader />
			<ChatBody />
		</div>
	</div>
);

export default ChatPage;
