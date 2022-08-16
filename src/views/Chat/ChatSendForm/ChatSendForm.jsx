import React from "react";
import {useForm} from "react-hook-form";
import {MdSend} from "react-icons/md";
import PropTypes from "prop-types";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import messages from "../../../store/messages";

const ChatSendForm = ({id}) => {
	const {
		handleSubmit,
		register,
		formState: {isSubmitting}
	} = useForm();

	const onSubmit = async data => messages.send(id, data.message);

	return (
		<form className="flex" onSubmit={handleSubmit(onSubmit)}>
			<Input
				className="flex-grow mr-4"
				placeholder="Message"
				{...register("message")}
			/>
			<Button disabled={isSubmitting} type="submit" startIcon={MdSend}>
				Send
			</Button>
		</form>
	);
};

ChatSendForm.propTypes = {
	id: PropTypes.string.isRequired
};

export default ChatSendForm;
