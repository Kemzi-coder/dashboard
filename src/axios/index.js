import axios from "axios";

const $api = axios.create({
	baseURL: process.env.REACT_APP_API_URL
});

$api.interceptors.request.use(config => {
	config.params = {
		...config.params,
		session_token: localStorage.getItem("token")
	};

	return config;
});

$api.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config;
		if (
			error.response.status === 401 &&
			error.config &&
			!error.config.isRetry
		) {
			originalRequest.isRetry = true;
			try {
				const response = await axios.post(
					`${process.env.API_URL}service/check_session`,
					{access_token: localStorage.getItem("token")}
				);
				localStorage.setItem("token", response.data.result.session.token);
				return $api.request(originalRequest);
			} catch (e) {
				console.log("Not authorized!");
			}
		}
		throw error;
	}
);

export default $api;
