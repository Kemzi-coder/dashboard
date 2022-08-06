const createFormValidation = {
	proxy_type: {
		required: "Type is required."
	},
	proxy_host: {
		required: "Host is required."
	},
	proxy_port: {
		required: "Port is required.",
		pattern: {
			value: /^[0-9]*$/,
			message: "Port must be number."
		}
	}
};

export default createFormValidation;
