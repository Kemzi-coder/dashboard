import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import getFullName from "../../utils/helpers/getFullName";
import Avatar from "../Avatar/Avatar";

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
	const fallbackStr = "–";
	const statusClassConditions = {
		"text-danger": status === "bad",
		"text-warning": status === "sms" || status === "2fa",
		"text-success": status === "good"
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
				{photo ? <Avatar imagePath={photo} /> : fallbackStr}
			</td>
			<td
				role="presentation"
				onClick={onClick}
				className="relative py-3 px-3 text-ellipsis overflow-hidden cursor-pointer whitespace-nowrap"
			>
				{fullName || fallbackStr}
			</td>
			<td
				role="presentation"
				onClick={onClick}
				className="py-3 px-3 text-ellipsis overflow-hidden cursor-pointer whitespace-nowrap"
			>
				{username || fallbackStr}
			</td>
			<td
				role="presentation"
				onClick={onClick}
				className="py-3 px-3 text-ellipsis overflow-hidden cursor-pointer whitespace-nowrap"
			>
				{phone || fallbackStr}
			</td>
			<td
				role="presentation"
				onClick={onClick}
				className="py-3 px-3 text-ellipsis overflow-hidden cursor-pointer whitespace-nowrap"
			>
				{uuid || fallbackStr}
			</td>
		</tr>
	);
};

AccountItem.propTypes = {
	number: PropTypes.number.isRequired,
	uuid: PropTypes.string.isRequired,
	phone: PropTypes.string.isRequired,
	status: PropTypes.string.isRequired,
	firstName: PropTypes.string.isRequired,
	lastName: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	photo: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};

export default AccountItem;
