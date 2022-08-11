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

	static changePassword(oldPass, newPass) {
		return $api.post("service/change_password", {
			old_password: oldPass,
			new_password: newPass
		});
	}

	static changeUsername(username) {
		return $api.post("service/change_username", {username});
	}
}

export default AuthAPI;
