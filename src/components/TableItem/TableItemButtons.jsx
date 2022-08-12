import React from "react";
import PropTypes from "prop-types";
import {TableButton, TableCell} from "../Table";

const TableItemButtons = ({
	isEditable,
	isLoading,
	onEdit,
	enableIsEditable,
	onDelete,
	onCheck
}) => (
	<TableCell role="presentation" className="flex">
		{onCheck !== null && (
			<TableButton
				className="mr-3"
				variant="success"
				disabled={isLoading}
				onClick={onCheck}
			>
				check
			</TableButton>
		)}
		{isEditable && onEdit !== null ? (
			<TableButton
				variant="success"
				disabled={isLoading}
				onClick={onEdit}
				className="mr-3"
			>
				save
			</TableButton>
		) : (
			<TableButton
				variant="warning"
				disabled={isLoading}
				onClick={enableIsEditable}
				className="mr-3"
			>
				edit
			</TableButton>
		)}
		{onDelete !== null && (
			<TableButton variant="danger" disabled={isLoading} onClick={onDelete}>
				delete
			</TableButton>
		)}
	</TableCell>
);

TableItemButtons.propTypes = {
	enableIsEditable: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
	onCheck: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
	onEdit: PropTypes.func.isRequired,
	isEditable: PropTypes.bool.isRequired
};

export default TableItemButtons;
