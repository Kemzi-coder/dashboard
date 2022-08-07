import classNames from "classnames";

// eslint-disable-next-line import/prefer-default-export
export const getStatusClass = status =>
	classNames({
		"text-danger": status === "bad",
		"text-warning": status === "sms" || status === "2fa",
		"text-success": status === "good"
	});
