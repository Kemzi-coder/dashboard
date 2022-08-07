import PropTypes from "prop-types";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import formatDate from "../../utils/helpers/formatDate";
import {TableCell, TableRow} from "../Table";
import {tableFallbackStr} from "../../utils/constants/fallback";
import ProxyItemButtons from "./ProxyItemButtons";
import {getStatusClass} from "../../utils/constants/table";

const ProxyItem = ({
	status,
	type,
	host,
	uuid,
	checkedAt,
	number,
	onClick,
	onDelete,
	onSave,
	isActionsAllowed,
	isLoading
}) => {
	const {
		handleSubmit,
		register,
		formState: {isDirty}
	} = useForm();

	const [isEditable, setIsEditable] = useState(false);
	const formattedDate = formatDate(new Date(checkedAt));
	const statusClass = getStatusClass(status);

	const handleEdit = () => setIsEditable(true);

	const handleSave = async () => {
		if (isDirty) {
			await handleSubmit(onSave)();
		}
		setIsEditable(false);
	};

	return (
		<TableRow>
			<TableCell>{number}</TableCell>
			<TableCell className={statusClass}>
				{status || tableFallbackStr}
			</TableCell>
			<TableCell>
				{isEditable ? (
					<input
						className="bg-transparent w-full text-white border border-primaryLighter rounded-2xl py-1 px-2"
						defaultValue={type}
						type="text"
						{...register("proxy_type")}
					/>
				) : (
					type || tableFallbackStr
				)}
			</TableCell>
			<TableCell role="presentation" onClick={onClick}>
				{isEditable ? (
					<input
						className="bg-transparent w-full text-white border border-primaryLighter rounded-2xl py-1 px-2"
						defaultValue={host}
						type="text"
						{...register("proxy_host")}
					/>
				) : (
					host || tableFallbackStr
				)}
			</TableCell>
			<TableCell role="presentation" onClick={onClick}>
				{formattedDate || tableFallbackStr}
			</TableCell>
			<TableCell role="presentation" onClick={onClick}>
				{uuid || tableFallbackStr}
			</TableCell>
			{isActionsAllowed && (
				<ProxyItemButtons
					isEditable={isEditable}
					isLoading={isLoading}
					onDelete={onDelete}
					onEdit={handleEdit}
					onSave={handleSave}
				/>
			)}
		</TableRow>
	);
};

ProxyItem.propTypes = {
	type: PropTypes.string,
	status: PropTypes.string,
	host: PropTypes.string,
	uuid: PropTypes.string,
	checkedAt: PropTypes.string,
	number: PropTypes.number.isRequired,
	onClick: PropTypes.func,
	onDelete: PropTypes.func,
	isActionsAllowed: PropTypes.bool,
	onSave: PropTypes.func,
	isLoading: PropTypes.bool
};

ProxyItem.defaultProps = {
	onClick: null,
	onDelete: null,
	isActionsAllowed: false,
	isLoading: false,
	onSave: null,
	uuid: "",
	checkedAt: "",
	host: "",
	status: "",
	type: ""
};

export default ProxyItem;
