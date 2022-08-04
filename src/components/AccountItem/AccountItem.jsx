import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Avatar from "../Avatar/Avatar";

const AccountItem = ({
	number,
	phone,
	status,
	firstName,
	lastName,
	username,
	photo,
	uuid
}) => {
	const handleClick = e => navigator.clipboard.writeText(e.target.textContent);

	return (
		<tr className="border rounded-2xl border-primaryLighter">
			<td className="py-3 px-3 text-ellipsis overflow-hidden">{number}</td>
			<td
				role="presentation"
				onClick={handleClick}
				className="py-3 px-3 text-ellipsis overflow-hidden cursor-pointer"
			>
				{uuid || "Not found"}
			</td>
			<td className="py-3 px-3 text-ellipsis overflow-hidden">
				<Avatar imagePath={photo} />
			</td>
			<td
				role="presentation"
				onClick={handleClick}
				className="py-3 px-3 text-ellipsis overflow-hidden cursor-pointer"
			>
				{firstName && lastName ? `${firstName} ${lastName}` : "Not found"}
			</td>
			<td
				role="presentation"
				onClick={handleClick}
				className="py-3 px-3 text-ellipsis overflow-hidden cursor-pointer"
			>
				{username || "Not found"}
			</td>
			<td
				role="presentation"
				onClick={handleClick}
				className="py-3 px-3 text-ellipsis overflow-hidden cursor-pointer"
			>
				{phone || "Not found"}
			</td>
			<td
				className={classNames("py-3 px-3 text-ellipsis overflow-hidden", {
					"text-danger": status === "bad",
					"text-warning": status === "sms" || status === "2fa",
					"text-success": status === "good"
				})}
			>
				{status || "Not found"}
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
	photo: PropTypes.string.isRequired
};

export default AccountItem;
