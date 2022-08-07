import PropTypes from "prop-types";
import React from "react";
import getFullName from "../../utils/helpers/getFullName";
import Avatar from "../Avatar/Avatar";
import {TableCell, TableRow} from "../Table";
import {tableFallbackStr} from "../../utils/constants/fallback";
import {getStatusClass} from "../../utils/constants/table";

const AccountItem = ({
	number,
	phone,
	status,
	firstName,
	lastName,
	username,
	photo,
	uuid,
	onClick
}) => {
	const fullName = getFullName(firstName, lastName);
	const statusClass = getStatusClass(status);

	return (
		<TableRow>
			<TableCell>{number}</TableCell>
			<TableCell className={statusClass}>
				{status || tableFallbackStr}
			</TableCell>
			<TableCell>
				{photo ? <Avatar imagePath={photo} /> : tableFallbackStr}
			</TableCell>
			<TableCell role="presentation" onClick={onClick}>
				{fullName || tableFallbackStr}
			</TableCell>
			<TableCell role="presentation" onClick={onClick}>
				{username || tableFallbackStr}
			</TableCell>
			<TableCell role="presentation" onClick={onClick}>
				{phone || tableFallbackStr}
			</TableCell>
			<TableCell role="presentation" onClick={onClick}>
				{uuid || tableFallbackStr}
			</TableCell>
		</TableRow>
	);
};

AccountItem.propTypes = {
	number: PropTypes.number.isRequired,
	uuid: PropTypes.string,
	phone: PropTypes.string,
	status: PropTypes.string,
	firstName: PropTypes.string,
	lastName: PropTypes.string,
	username: PropTypes.string,
	photo: PropTypes.string,
	onClick: PropTypes.func
};

AccountItem.defaultProps = {
	onClick: null,
	uuid: "",
	phone: "",
	status: "",
	firstName: "",
	lastName: "",
	username: "",
	photo: ""
};

export default AccountItem;
