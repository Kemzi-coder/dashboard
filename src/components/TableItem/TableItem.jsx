import React, {useState} from "react";
import {useForm} from "react-hook-form";
import PropTypes from "prop-types";
import {TableCell, TableRow} from "../Table";
import {tableFallbackStr} from "../../utils/constants/fallback";
import {getStatusClass} from "../../utils/constants/table";
import formatDate from "../../utils/helpers/formatDate";
import TableItemButtons from "./TableItemButtons";

const TableItem = ({
	number,
	values,
	onClick,
	onDelete,
	onOpen,
	onEdit,
	onCheck,
	isActionsAllowed,
	isLoading
}) => {
	const {
		handleSubmit,
		register,
		formState: {isDirty}
	} = useForm();

	const [isEditable, setIsEditable] = useState(false);

	const enableIsEditable = () => setIsEditable(true);

	const handleEdit = async () => {
		if (isDirty) {
			await handleSubmit(onEdit)();
		}
		setIsEditable(false);
	};

	return (
		<TableRow>
			<TableCell>{number}</TableCell>
			{isActionsAllowed &&
			(onEdit !== null || onDelete !== null || onCheck !== null) ? (
				<TableItemButtons
					onCheck={onCheck}
					onOpen={onOpen}
					isEditAllowed={values.some(value => value.is_editable === true)}
					isEditable={isEditable}
					isLoading={isLoading}
					onDelete={onDelete}
					onEdit={handleEdit}
					enableIsEditable={enableIsEditable}
				/>
			) : (
				<TableCell>{tableFallbackStr}</TableCell>
			)}
			{values.map(item => {
				let className = "";
				let {value} = item;
				const {name, is_editable: isEditAllowed} = item;

				if (name === "checked_at") {
					value = formatDate(new Date(value));
				} else if (name === "status") {
					className = getStatusClass(value);
				}

				if (isEditAllowed) {
					return (
						<TableCell onClick={onClick} className={className} key={name}>
							{isEditable ? (
								<input
									className="bg-transparent w-32 text-text-light border-2 border-primary-lighter rounded-base py-1 px-2"
									defaultValue={value}
									type="text"
									{...register(name)}
								/>
							) : (
								value || tableFallbackStr
							)}
						</TableCell>
					);
				}

				return (
					<TableCell key={name} onClick={onClick} className={className}>
						{value || tableFallbackStr}
					</TableCell>
				);
			})}
		</TableRow>
	);
};

TableItem.propTypes = {
	number: PropTypes.number.isRequired,
	onClick: PropTypes.func,
	onDelete: PropTypes.func,
	isActionsAllowed: PropTypes.bool,
	onEdit: PropTypes.func,
	onCheck: PropTypes.func,
	onOpen: PropTypes.func,
	isLoading: PropTypes.bool,
	values: PropTypes.array.isRequired
};

TableItem.defaultProps = {
	onClick: null,
	onDelete: null,
	onCheck: null,
	isActionsAllowed: false,
	isLoading: false,
	onEdit: null,
	onOpen: null
};

export default TableItem;
