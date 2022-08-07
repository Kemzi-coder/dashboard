import classNames from "classnames";
import PropTypes from "prop-types";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import formatDate from "../../utils/helpers/formatDate";

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
	isPrivate
}) => {
	const {
		handleSubmit,
		register,
		formState: {isDirty}
	} = useForm();

	const [isEditable, setIsEditable] = useState(false);
	const formattedDate = formatDate(new Date(checkedAt));
	const fallbackStr = "–";
	const statusClassConditions = {
		"text-danger": status === "bad",
		"text-warning": status === "sms" || status === "2fa",
		"text-success": status === "good"
	};

	const handleEdit = () => setIsEditable(true);

	const handleSave = async () => {
		if (isDirty) {
			await handleSubmit(onSave)();
		}
		setIsEditable(false);
	};

	return (
		<tr className="border rounded-2xl border-primaryLighter">
			<td className="py-3 px-3 text-ellipsis overflow-hidden">{number}</td>
			<td
				className={classNames(
					"py-3 px-3 text-ellipsis overflow-hidden whitespace-nowrap",
					statusClassConditions
				)}
			>
				{status || fallbackStr}
			</td>
			<td className="py-3 px-3 text-ellipsis overflow-hidden whitespace-nowrap">
				{isEditable ? (
					<input
						className="bg-transparent w-full text-white border border-primaryLighter rounded-2xl py-1 px-2"
						defaultValue={type}
						type="text"
						{...register("proxy_type")}
					/>
				) : (
					type || fallbackStr
				)}
			</td>
			<td
				role="presentation"
				onClick={onClick}
				className="relative py-3 px-3 text-ellipsis overflow-hidden cursor-pointer whitespace-nowrap"
			>
				{isEditable ? (
					<input
						className="bg-transparent w-full text-white border border-primaryLighter rounded-2xl py-1 px-2"
						defaultValue={host}
						type="text"
						{...register("proxy_host")}
					/>
				) : (
					host || fallbackStr
				)}
			</td>
			<td
				role="presentation"
				onClick={onClick}
				className="py-3 px-3 text-ellipsis overflow-hidden cursor-pointer whitespace-nowrap"
			>
				{formattedDate || fallbackStr}
			</td>
			<td
				role="presentation"
				onClick={onClick}
				className="py-3 px-3 text-ellipsis overflow-hidden cursor-pointer whitespace-nowrap"
			>
				{uuid || fallbackStr}
			</td>
			{isPrivate && (
				<td
					role="presentation"
					className="flex py-3 px-3 text-ellipsis overflow-hidden cursor-pointer whitespace-nowrap"
				>
					{isEditable ? (
						<button
							onClick={handleSave}
							className="mr-3 border border-success rounded-2xl py-1 text-sm px-2 hover:text-primary hover:bg-success transition-colors"
							type="button"
						>
							save
						</button>
					) : (
						<button
							onClick={handleEdit}
							className="mr-3 border border-warning rounded-2xl py-1 text-sm px-2 hover:text-primary hover:bg-warning transition-colors"
							type="button"
						>
							edit
						</button>
					)}
					<button
						className="border border-danger rounded-2xl py-1 text-sm px-2 hover:bg-danger hover:text-primary transition-colors"
						onClick={onDelete}
						type="button"
					>
						delete
					</button>
				</td>
			)}
		</tr>
	);
};

ProxyItem.propTypes = {
	type: PropTypes.string.isRequired,
	status: PropTypes.string.isRequired,
	host: PropTypes.string.isRequired,
	uuid: PropTypes.string.isRequired,
	checkedAt: PropTypes.string.isRequired,
	number: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
	isPrivate: PropTypes.bool.isRequired,
	onSave: PropTypes.func.isRequired
};

export default ProxyItem;
