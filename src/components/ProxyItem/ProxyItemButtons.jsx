import React from "react";
import PropTypes from "prop-types";
import {TableCell, TableButton} from "../Table";

const ProxyItemButtons = ({
	isEditable,
	isLoading,
	onSave,
	onEdit,
	onDelete
}) => (
	<TableCell role="presentation" className="flex">
		{isEditable ? (
			<TableButton
				variant="success"
				disabled={isLoading}
				onClick={onSave}
				className="mr-3"
			>
				save
			</TableButton>
		) : (
			<TableButton
				variant="warning"
				disabled={isLoading}
				onClick={onEdit}
				className="mr-3"
			>
				edit
			</TableButton>
		)}
		<TableButton variant="danger" disabled={isLoading} onClick={onDelete}>
			delete
		</TableButton>
	</TableCell>
);

ProxyItemButtons.propTypes = {
	onSave: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
	onEdit: PropTypes.func.isRequired,
	isEditable: PropTypes.bool.isRequired
};

export default ProxyItemButtons;
