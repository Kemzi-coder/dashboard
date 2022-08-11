export const profileSettingsFormValidation = {
	username: {
		minLength: {
			value: 5,
			message: "Username must be at least 5 characters long."
		}
	},
	old_password: {
		minLength: {
			value: 8,
			message: "Old password must be at least 8 characters long."
		}
	},
	new_password: {
		minLength: {
			value: 8,
			message: "New password must be at least 8 characters long."
		}
	}
};

export const notificationSettingsFormValidation = {
	telegram_uuid: {
		maxLength: {
			value: 25,
			message: "Login must be no more than 25 characters."
		}
	}
};
