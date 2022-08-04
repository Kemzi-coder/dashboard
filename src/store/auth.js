import {makeAutoObservable} from "mobx";
import AuthAPI from "../API/auth/auth.api";

class Auth {
	user = {};

	isAuth = false;

	isLoading = false;

	constructor() {
		makeAutoObservable(this);
	}

	setIsAuth(isAuth) {
		this.isAuth = isAuth;
	}

	setUser(user) {
		this.user = user;
	}

	setIsLoading(isLoading) {
		this.isLoading = isLoading;
	}

	async login({username, password}, setError) {
		try {
			const response = await AuthAPI.login({username, password});
			console.log(response);
			localStorage.setItem("token", response.data.session.token);
			this.setIsAuth(true);
			this.setUser(response.data.user);
		} catch (e) {
			console.log(e);
			setError("response", {message: e.response.data.error.message});
		}
	}

	// eslint-disable-next-line class-methods-use-this
	async register({username, password}, setError, redirectToLoginForm) {
		try {
			const response = await AuthAPI.register({username, password});
			console.log(response);
			redirectToLoginForm();
		} catch (e) {
			setError("response", {message: e.response.data.error.message});
		}
	}

	async check() {
		this.setIsLoading(true);
		try {
			const response = await AuthAPI.check();
			console.log(response);
			this.setIsAuth(true);
			this.setUser(response.data.result.user);
		} catch (e) {
			console.log(e);
		} finally {
			this.setIsLoading(false);
		}
	}
}

export default new Auth();
