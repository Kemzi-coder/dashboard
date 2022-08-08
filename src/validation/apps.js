const createFormValidation = {
	app_name: {
		maxLength: {
			value: 30,
			message: "Name must be no more than 30 characters."
		}
	},
	app_id: {
		required: "Id is required.",
		pattern: {
			value: /^[0-9]*$/,
			message: "Id must be number."
		},
		maxLength: {
			value: 15,
			message: "Id must be no more than 15 characters."
		}
	},
	app_hash: {
		required: "Hash is required.",
		maxLength: {
			value: 50,
			message: "Hash must be no more than 50 characters."
		}
	}
};

export default createFormValidation;
