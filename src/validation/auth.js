const authFormValidation = {
	username: {
		required: "Username is required.",
		minLength: {
			value: 5,
			message: "Username must be at least 5 characters long."
		}
	},
	password: {
		required: "Password is required.",
		minLength: {
			value: 8,
			message: "Password must be at least 8 characters long."
		}
	}
};

export default authFormValidation;
