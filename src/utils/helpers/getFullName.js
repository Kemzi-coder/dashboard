const getFullName = (firstName, lastName) => {
	const result = [];

	if (firstName) {
		result.push(firstName);
	}

	if (lastName) {
		result.push(lastName);
	}

	return result.join(" ");
};

export default getFullName;
