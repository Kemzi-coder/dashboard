import $api from "../../axios/index";

class AccountsAPI {
	static fetchAll(params) {
		return $api.get("account/get_account_list", {params});
	}
}

export default AccountsAPI;
