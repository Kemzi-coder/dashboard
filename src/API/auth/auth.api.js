import axios from "axios";
import $api from "../../axios";

class AuthAPI {
	static login({username, password}) {
		return axios.post(`${process.env.REACT_APP_API_URL}service/login`, {
			username,
			password
		});
	}

	static register({username, password}) {
		return axios.post(`${process.env.REACT_APP_API_URL}service/register`, {
			username,
			password
		});
	}

	static check() {
		return $api.get("service/check_session");
	}
}

export default AuthAPI;
