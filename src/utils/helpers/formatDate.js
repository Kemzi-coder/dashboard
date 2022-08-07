const padTo2Digits = num => num.toString().padStart(2, "0");

const formatDate = date =>
	`${[
		padTo2Digits(date.getMonth() + 1),
		padTo2Digits(date.getDate()),
		date.getFullYear()
	].join("/")} ${[date.getHours(), date.getMinutes(), date.getSeconds()].join(
		":"
	)}`;

export default formatDate;
