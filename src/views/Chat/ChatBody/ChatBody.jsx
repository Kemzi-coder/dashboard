import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import MessageItem from "../../../components/MessageItem/MessageItem";
import ChatSendForm from "../ChatSendForm/ChatSendForm";
import messages from "../../../store/messages";

const ChatBody = observer(() => {
	const {id} = useParams();

	useEffect(() => {
		if (id) {
			messages.fetchByChatId(id);
		}
	}, [id]);

	if (!id) {
		return (
			<div className="flex flex-col p-6 border-r border-primary-lighter">
				Choose a chat.
			</div>
		);
	}

	return (
		<div className="flex flex-col justify-end p-6 border-r border-primary-lighter">
			{messages.isLoading ? (
				<div className="mb-4">Loading...</div>
			) : (
				<div className="mb-4 space-y-3">
					{messages.messages.map(message => (
						<MessageItem
							key={message.message_id}
							isMine={message.from_me}
							message={message.text}
						/>
					))}
				</div>
			)}
			<ChatSendForm id={id} />
		</div>
	);
});

export default ChatBody;
