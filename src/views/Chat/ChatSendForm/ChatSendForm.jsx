import React from "react";
import {useForm} from "react-hook-form";
import {MdSend} from "react-icons/md";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";

const ChatSendForm = () => {
	const {handleSubmit} = useForm();

	const onSubmit = () => console.log("Submit");

	return (
		<form className="flex" onSubmit={handleSubmit(onSubmit)}>
			<Input className="flex-grow mr-4" placeholder="Message" />
			<Button startIcon={MdSend}>Send</Button>
		</form>
	);
};

export default ChatSendForm;
