import React from "react";
import PropTypes from "prop-types";
import {TableButton, TableCell} from "../Table";

const TableItemButtons = ({
	isEditable,
	isLoading,
	onEdit,
	enableIsEditable,
	onDelete,
	onCheck,
	onOpen,
	isEditAllowed
}) => (
	<TableCell role="presentation" className="flex">
		{onOpen !== null && (
			<TableButton
				className="mr-3"
				variant="success"
				disabled={isLoading}
				onClick={onOpen}
			>
				open
			</TableButton>
		)}
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
		{isEditAllowed &&
			(isEditable && onEdit !== null ? (
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
			))}
		{onDelete !== null && (
			<TableButton variant="danger" disabled={isLoading} onClick={onDelete}>
				delete
			</TableButton>
		)}
	</TableCell>
);

TableItemButtons.propTypes = {
	enableIsEditable: PropTypes.func.isRequired,
	onDelete: PropTypes.func,
	onCheck: PropTypes.func,
	isLoading: PropTypes.bool.isRequired,
	onEdit: PropTypes.func,
	isEditable: PropTypes.bool.isRequired,
	isEditAllowed: PropTypes.bool.isRequired,
	onOpen: PropTypes.func
};

TableItemButtons.defaultProps = {
	onDelete: null,
	onCheck: null,
	onEdit: null,
	onOpen: null
};

export default TableItemButtons;
