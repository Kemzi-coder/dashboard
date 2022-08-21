import {makeAutoObservable} from "mobx";
import AuthAPI from "../API/auth/auth.api";
import FilesAPI from "../API/files/files.api";

class AuthState {
	user = {};

	isAuth = false;

	isLoading = true;

	constructor() {
		makeAutoObservable(this);
	}

	setIsLoading(isLoading) {
		this.isLoading = isLoading;
	}

	*login({username, password}, setError) {
		try {
			const response = yield AuthAPI.login({username, password});
			console.log(response);
			const {user} = response.data.result;

			localStorage.setItem("token", response.data.session.token);
			this.isAuth = true;
			this.user = user;
		} catch (e) {
			console.log(e);
			setError("response", {message: e.response.data.error.message});
		}
	}

	// eslint-disable-next-line class-methods-use-this
	*register({username, password}, setError, redirectToLoginForm) {
		try {
			const response = yield AuthAPI.register({username, password});
			console.log(response);
			redirectToLoginForm();
		} catch (e) {
			setError("response", {message: e.response.data.error.message});
		}
	}

	*check() {
		this.isLoading = true;
		try {
			const response = yield AuthAPI.check();
			console.log(response);
			const {user} = response.data.result;

			this.isAuth = true;
			this.user = user;
		} catch (e) {
			console.log(e);
		} finally {
			this.isLoading = false;
		}
	}

	// eslint-disable-next-line class-methods-use-this
	*changePassword(oldPass, newPass, setError) {
		try {
			const response = yield AuthAPI.changePassword(oldPass, newPass);
			console.log(response);
		} catch (e) {
			setError("old_password", {
				message: e.response.data.error.message
			});
			console.log(e);
		}
	}

	// eslint-disable-next-line class-methods-use-this
	*changeUsername(username, setError) {
		try {
			const response = yield AuthAPI.changeUsername(username);
			console.log(response);
		} catch (e) {
			setError("username", {
				message: e.response.data.error.message
			});
			console.log(e);
		}
	}

	*uploadAvatar(file) {
		try {
			const response = yield FilesAPI.uploadAvatar(file);
			console.log(response);
			const {user} = response.data.result;

			this.user = user;
		} catch (e) {
			console.log(e);
		}
	}
}

export default new AuthState();
